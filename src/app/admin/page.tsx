'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Package, 
  ShoppingBag, 
  DollarSign, 
  AlertTriangle, 
  Settings, 
  Layers, 
  Plus, 
  Edit, 
  Trash2, 
  Download, 
  Search, 
  CheckCircle2, 
  X, 
  LogOut, 
  ExternalLink,
  Phone,
  Instagram,
  Eye,
  RefreshCw
} from 'lucide-react';
import { Product, Category, Order, StoreSettings } from '@/types';
import { defaultStoreSettings } from '@/config/store';

export default function AdminPage() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState<boolean>(true);

  // Data states
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'categories' | 'orders' | 'settings'>('overview');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [settings, setSettings] = useState<StoreSettings>(defaultStoreSettings);
  const [loading, setLoading] = useState<boolean>(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  // Category Modal State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Partial<Category> | null>(null);

  // Order Details Modal State
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Filter states
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [productSearch, setProductSearch] = useState('');

  // Check login on load
  useEffect(() => {
    fetch('/api/admin/check')
      .then((res) => {
        if (res.ok) setIsAuthenticated(true);
      })
      .catch((e) => console.error(e))
      .finally(() => setCheckingAuth(false));
  }, []);

  // Fetch all admin data
  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes, orderRes, setRes] = await Promise.all([
        fetch('/api/products').then((r) => r.json()),
        fetch('/api/categories?admin=true').then((r) => r.json()),
        fetch('/api/orders').then((r) => r.json()),
        fetch('/api/settings').then((r) => r.json()),
      ]);

      if (prodRes.success) setProducts(prodRes.products);
      if (catRes.success) setCategories(catRes.categories);
      if (orderRes.success) setOrders(orderRes.orders);
      if (setRes.success) setSettings(setRes.settings);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
      } else {
        setLoginError(data.error || 'Invalid password.');
      }
    } catch (err: any) {
      setLoginError(err.message || 'Login failed.');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' });
    setIsAuthenticated(false);
  };

  const triggerToast = (msg: string) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(null), 3000);
  };

  // Metrics
  const totalRevenue = orders
    .filter((o) => o.orderStatus !== 'cancelled')
    .reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter((o) => o.orderStatus === 'pending');
  const lowStockProducts = products.filter((p) => p.stock <= 5);

  // Export Orders CSV
  const handleExportCSV = () => {
    const headers = ['Order ID', 'Date', 'Customer', 'Phone', 'WhatsApp', 'City', 'Total', 'Payment Method', 'Payment Status', 'Order Status', 'Items'];
    const rows = orders.map((o) => [
      o.id,
      new Date(o.createdAt).toLocaleDateString('en-IN'),
      `"${o.customer.fullName.replace(/"/g, '""')}"`,
      o.customer.phone,
      o.customer.whatsappNumber,
      `"${o.customer.city}"`,
      o.total,
      o.paymentMethod,
      o.paymentStatus,
      o.orderStatus,
      `"${o.items.map((i) => `${i.name} (x${i.quantity})`).join(', ')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `rumana_creations_orders_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('Orders exported to CSV successfully!');
  };

  // Save Product (Create or Edit)
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.name || !editingProduct?.price || !editingProduct?.category) return;

    try {
      const isNew = !editingProduct.id;
      const url = isNew ? '/api/products' : `/api/products/${editingProduct.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProduct),
      });

      const data = await res.json();
      if (data.success) {
        setIsProductModalOpen(false);
        setEditingProduct(null);
        fetchData();
        triggerToast(isNew ? 'New accessory published!' : 'Accessory updated successfully!');
      } else {
        alert(data.error);
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Delete Product
  const handleDeleteProduct = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchData();
        triggerToast(`Deleted ${name}.`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Save Category
  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory?.name) return;
    try {
      const isNew = !editingCategory.id;
      const res = await fetch('/api/categories', {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCategory),
      });
      const data = await res.json();
      if (data.success) {
        setIsCategoryModalOpen(false);
        setEditingCategory(null);
        fetchData();
        triggerToast('Category saved!');
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Delete Category
  const handleDeleteCategory = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove category "${name}"?`)) return;
    try {
      await fetch(`/api/categories?id=${id}`, { method: 'DELETE' });
      fetchData();
      triggerToast('Category deleted.');
    } catch (err) {
      console.error(err);
    }
  };

  // Update Order Status
  const handleUpdateOrderStatus = async (
    orderId: string,
    updates: { orderStatus?: Order['orderStatus']; paymentStatus?: Order['paymentStatus']; trackingNumber?: string }
  ) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        const data = await res.json();
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder(data.order);
        }
        fetchData();
        triggerToast(`Order ${orderId} updated!`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Save Store Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        triggerToast('Store settings updated and saved live!');
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (checkingAuth) {
    return (
      <div className="py-24 bg-ivory-50 min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-burgundy border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Login Gate
  if (!isAuthenticated) {
    return (
      <div className="py-20 bg-ivory-50 min-h-screen flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl border border-gold-border p-8 sm:p-10 max-w-md w-full shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="relative w-16 h-16 mx-auto mb-2">
              <Image src={defaultStoreSettings.logoUrl} alt="Rumana Creations" fill className="object-contain" />
            </div>
            <span className="text-[10px] font-bold tracking-widest text-gold-dark uppercase block">
              Rumana Creations Administration
            </span>
            <h1 className="font-serif text-2xl font-bold text-burgundy">
              Boutique Staff Sign In
            </h1>
            <p className="text-xs text-charcoal-muted">
              Enter the administrator access key to manage orders, products, and store settings.
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Admin Password
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password (default: rumana2026)"
                className="w-full px-3.5 py-2.5 bg-cream-50 border border-gold-border rounded-xl text-xs sm:text-sm focus:outline-none focus:border-burgundy"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-burgundy hover:bg-burgundy-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-sm"
            >
              Access Dashboard
            </button>
          </form>

          <div className="text-center text-xs text-charcoal-muted pt-2 border-t border-gold-border">
            <Link href="/" className="text-burgundy hover:underline">
              ← Return to Rumana Creations Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    if (orderStatusFilter !== 'all' && o.orderStatus !== orderStatusFilter) return false;
    if (orderSearch.trim()) {
      const q = orderSearch.toLowerCase();
      const matchId = o.id.toLowerCase().includes(q);
      const matchName = o.customer.fullName.toLowerCase().includes(q);
      const matchPhone = o.customer.phone.includes(q);
      if (!matchId && !matchName && !matchPhone) return false;
    }
    return true;
  });

  // Filtered Products
  const filteredAdminProducts = products.filter((p) => {
    if (productSearch.trim()) {
      const q = productSearch.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.categoryName.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-cream-50 text-charcoal">
      
      {/* Top Admin Nav */}
      <div className="bg-white border-b border-gold-border sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9">
            <Image src={defaultStoreSettings.logoUrl} alt="Logo" fill className="object-contain" />
          </div>
          <div>
            <h1 className="font-serif text-lg font-bold text-burgundy leading-tight">
              Rumana Creations Admin
            </h1>
            <span className="text-[10px] text-gold-dark font-semibold uppercase tracking-wider block">
              Store Control Panel
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gold-border text-xs text-charcoal hover:bg-cream-100 transition"
          >
            <span>Live Storefront</span>
            <ExternalLink className="w-3.5 h-3.5 text-gold-dark" />
          </Link>

          <button
            type="button"
            onClick={fetchData}
            className="p-1.5 rounded-lg border border-gold-border text-charcoal hover:bg-cream-100 transition"
            title="Refresh data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cream-100 hover:bg-rose-50 text-xs font-semibold text-charcoal hover:text-rose-700 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      {/* Toast Alert */}
      {actionSuccess && (
        <div className="fixed top-16 right-8 z-50 bg-burgundy text-white px-4 py-2.5 rounded-xl shadow-lg border border-gold/40 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-gold-light" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Navigation Tabs */}
        <div className="flex space-x-2 border-b border-gold-border pb-4 mb-6 overflow-x-auto text-xs sm:text-sm font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl transition shrink-0 ${
              activeTab === 'overview'
                ? 'bg-burgundy text-white shadow-xs'
                : 'bg-white text-charcoal hover:bg-cream-100 border border-gold-border'
            }`}
          >
            Dashboard Overview
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl transition shrink-0 ${
              activeTab === 'products'
                ? 'bg-burgundy text-white shadow-xs'
                : 'bg-white text-charcoal hover:bg-cream-100 border border-gold-border'
            }`}
          >
            Products ({products.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2 rounded-xl transition shrink-0 ${
              activeTab === 'categories'
                ? 'bg-burgundy text-white shadow-xs'
                : 'bg-white text-charcoal hover:bg-cream-100 border border-gold-border'
            }`}
          >
            Categories ({categories.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl transition shrink-0 flex items-center gap-1.5 ${
              activeTab === 'orders'
                ? 'bg-burgundy text-white shadow-xs'
                : 'bg-white text-charcoal hover:bg-cream-100 border border-gold-border'
            }`}
          >
            <span>Orders ({orders.length})</span>
            {pendingOrders.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-gold-light animate-ping" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl transition shrink-0 ${
              activeTab === 'settings'
                ? 'bg-burgundy text-white shadow-xs'
                : 'bg-white text-charcoal hover:bg-cream-100 border border-gold-border'
            }`}
          >
            Store Settings
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              
              <div className="bg-white p-5 rounded-2xl border border-gold-border shadow-xs">
                <span className="text-[11px] font-bold text-charcoal-muted uppercase tracking-wider block mb-1">Total Sales</span>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-burgundy">
                  ₹{totalRevenue.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-emerald-700 block mt-1 font-medium">Excludes cancellations</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gold-border shadow-xs">
                <span className="text-[11px] font-bold text-charcoal-muted uppercase tracking-wider block mb-1">Total Orders</span>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
                  {orders.length}
                </span>
                <span className="text-[10px] text-gold-dark block mt-1 font-medium">{pendingOrders.length} pending fulfillment</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gold-border shadow-xs">
                <span className="text-[11px] font-bold text-charcoal-muted uppercase tracking-wider block mb-1">Active Catalog</span>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
                  {products.length}
                </span>
                <span className="text-[10px] text-charcoal-muted block mt-1 font-medium">Across {categories.length} categories</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gold-border shadow-xs">
                <span className="text-[11px] font-bold text-charcoal-muted uppercase tracking-wider block mb-1">Low Stock Alert</span>
                <span className={`font-serif text-2xl sm:text-3xl font-bold ${lowStockProducts.length > 0 ? 'text-rose-700' : 'text-emerald-700'}`}>
                  {lowStockProducts.length}
                </span>
                <span className="text-[10px] text-charcoal-muted block mt-1 font-medium">Items with ≤ 5 units left</span>
              </div>

            </div>

            {/* Low stock warning banner if any */}
            {lowStockProducts.length > 0 && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>
                    <strong>Low stock warning:</strong> {lowStockProducts.map((p) => `${p.name} (${p.stock} left)`).join(', ')}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('products')}
                  className="underline font-bold text-amber-950 shrink-0 ml-2"
                >
                  Manage Stock
                </button>
              </div>
            )}

            {/* Recent Orders Table */}
            <div className="bg-white rounded-3xl border border-gold-border p-6 shadow-subtle space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-burgundy">Recent Orders</h3>
                <button
                  type="button"
                  onClick={() => setActiveTab('orders')}
                  className="text-xs font-semibold text-burgundy hover:underline"
                >
                  View All Orders →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gold-border text-charcoal-muted font-bold uppercase text-[10px]">
                      <th className="pb-3">Order ID</th>
                      <th className="pb-3">Customer</th>
                      <th className="pb-3">Items</th>
                      <th className="pb-3">Total</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cream-200">
                    {orders.slice(0, 5).map((ord) => (
                      <tr key={ord.id} className="hover:bg-cream-50">
                        <td className="py-3 font-mono font-bold text-burgundy">{ord.id}</td>
                        <td className="py-3 font-medium text-charcoal">{ord.customer.fullName}</td>
                        <td className="py-3 text-charcoal-light">{ord.items.length} items</td>
                        <td className="py-3 font-bold text-burgundy">₹{ord.total}</td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            ord.orderStatus === 'delivered' ? 'bg-emerald-100 text-emerald-800' :
                            ord.orderStatus === 'shipped' ? 'bg-blue-100 text-blue-800' :
                            ord.orderStatus === 'confirmed' ? 'bg-purple-100 text-purple-800' :
                            ord.orderStatus === 'cancelled' ? 'bg-rose-100 text-rose-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {ord.orderStatus}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <button
                            type="button"
                            onClick={() => setSelectedOrder(ord)}
                            className="px-2.5 py-1 rounded bg-cream-100 hover:bg-cream-200 text-burgundy text-[11px] font-semibold"
                          >
                            Inspect
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 bg-white p-4 rounded-2xl border border-gold-border shadow-xs">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search products by title or SKU..."
                  className="w-full pl-9 pr-3 py-2 bg-cream-50 border border-gold-border rounded-xl text-xs focus:outline-none focus:border-burgundy"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  setEditingProduct({
                    name: '',
                    category: categories[0]?.slug || 'claw-clips',
                    price: 299,
                    originalPrice: 399,
                    description: '',
                    stock: 20,
                    sku: `RC-${Date.now().toString().slice(-4)}`,
                    images: ['/images/products/tortoise-claw-1.svg'],
                    isFeatured: false,
                    isNewArrival: true,
                    isBestSeller: false,
                  });
                  setIsProductModalOpen(true);
                }}
                className="px-4 py-2 bg-burgundy hover:bg-burgundy-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Accessory</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-3xl border border-gold-border overflow-hidden shadow-subtle">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gold-border bg-cream-100/60 text-charcoal-muted font-bold uppercase text-[10px]">
                      <th className="p-4">Accessory</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Inventory</th>
                      <th className="p-4">Tags</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cream-200">
                    {filteredAdminProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-cream-50">
                        <td className="p-4 flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-cream-50 border border-gold-border/60 shrink-0">
                            <Image src={p.images[0] || '/images/products/tortoise-claw-1.svg'} alt={p.name} fill className="object-cover" />
                          </div>
                          <div>
                            <span className="font-bold text-charcoal text-xs block">{p.name}</span>
                            <span className="text-[10px] text-charcoal-muted font-mono">{p.sku}</span>
                          </div>
                        </td>
                        <td className="p-4 font-medium text-gold-dark">{p.categoryName}</td>
                        <td className="p-4">
                          <span className="font-bold text-burgundy">₹{p.price}</span>
                          {p.originalPrice && (
                            <span className="text-[10px] text-charcoal-muted line-through ml-1.5">₹{p.originalPrice}</span>
                          )}
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            p.stock <= 5 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {p.stock} units
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-1">
                            {p.isFeatured && <span className="px-1.5 py-0.5 bg-gold/20 text-gold-dark rounded text-[9px] font-bold">Featured</span>}
                            {p.isNewArrival && <span className="px-1.5 py-0.5 bg-burgundy/10 text-burgundy rounded text-[9px] font-bold">New</span>}
                            {p.isBestSeller && <span className="px-1.5 py-0.5 bg-cream-200 text-charcoal rounded text-[9px] font-bold">Bestseller</span>}
                          </div>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingProduct(p);
                              setIsProductModalOpen(true);
                            }}
                            className="p-1.5 text-charcoal hover:text-burgundy rounded hover:bg-cream-200"
                            title="Edit Product"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(p.id, p.name)}
                            className="p-1.5 text-charcoal-muted hover:text-rose-700 rounded hover:bg-rose-50"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CATEGORIES */}
        {activeTab === 'categories' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gold-border shadow-xs">
              <span className="text-xs text-charcoal-light">Manage storefront category navigation & visibility</span>
              <button
                type="button"
                onClick={() => {
                  setEditingCategory({
                    name: '',
                    slug: '',
                    description: '',
                    image: '/images/categories/claw-clips.svg',
                    displayOrder: categories.length + 1,
                    isVisible: true,
                  });
                  setIsCategoryModalOpen(true);
                }}
                className="px-4 py-2 bg-burgundy hover:bg-burgundy-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition"
              >
                <Plus className="w-4 h-4" />
                <span>Add Category</span>
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-gold-border overflow-hidden shadow-subtle">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gold-border bg-cream-100/60 text-charcoal-muted font-bold uppercase text-[10px]">
                    <th className="p-4">Order</th>
                    <th className="p-4">Category Name</th>
                    <th className="p-4">Slug</th>
                    <th className="p-4">Visibility</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cream-200">
                  {categories.map((c) => (
                    <tr key={c.id} className="hover:bg-cream-50">
                      <td className="p-4 font-mono font-bold text-burgundy">{c.displayOrder}</td>
                      <td className="p-4 font-bold text-charcoal">{c.name}</td>
                      <td className="p-4 font-mono text-[11px] text-charcoal-muted">{c.slug}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          c.isVisible !== false ? 'bg-emerald-100 text-emerald-800' : 'bg-charcoal/10 text-charcoal-muted'
                        }`}>
                          {c.isVisible !== false ? 'Visible on Site' : 'Hidden'}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingCategory(c);
                            setIsCategoryModalOpen(true);
                          }}
                          className="p-1.5 text-charcoal hover:text-burgundy rounded hover:bg-cream-200"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteCategory(c.id, c.name)}
                          className="p-1.5 text-charcoal-muted hover:text-rose-700 rounded hover:bg-rose-50"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 bg-white p-4 rounded-2xl border border-gold-border shadow-xs">
              <div className="flex flex-wrap items-center gap-3 flex-1">
                <div className="relative min-w-[200px]">
                  <Search className="w-4 h-4 text-charcoal-muted absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    placeholder="Search Order ID, name, phone..."
                    className="w-full pl-9 pr-3 py-1.5 bg-cream-50 border border-gold-border rounded-xl text-xs focus:outline-none"
                  />
                </div>

                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="bg-cream-50 border border-gold-border text-xs rounded-xl px-3 py-1.5 text-charcoal"
                >
                  <option value="all">All Order Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <button
                type="button"
                onClick={handleExportCSV}
                className="px-4 py-2 bg-cream-200 hover:bg-cream-300 text-burgundy rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-gold-border overflow-hidden shadow-subtle">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gold-border bg-cream-100/60 text-charcoal-muted font-bold uppercase text-[10px]">
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Payment</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Order Status</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cream-200">
                  {filteredOrders.map((o) => (
                    <tr key={o.id} className="hover:bg-cream-50">
                      <td className="p-4 font-mono font-bold text-burgundy">{o.id}</td>
                      <td className="p-4">
                        <span className="font-semibold text-charcoal block">{o.customer.fullName}</span>
                        <span className="text-[10px] text-charcoal-muted">{o.customer.phone} • {o.customer.city}</span>
                      </td>
                      <td className="p-4">
                        <span className="font-medium uppercase text-[11px] block">{o.paymentMethod}</span>
                        <span className={`text-[10px] font-bold ${
                          o.paymentStatus === 'paid' ? 'text-emerald-700' : 'text-amber-700'
                        }`}>
                          {o.paymentStatus}
                        </span>
                      </td>
                      <td className="p-4 font-serif font-bold text-sm text-burgundy">₹{o.total}</td>
                      <td className="p-4">
                        <select
                          value={o.orderStatus}
                          onChange={(e) => handleUpdateOrderStatus(o.id, { orderStatus: e.target.value as any })}
                          className="bg-cream-50 border border-gold-border text-xs rounded-lg px-2 py-1 font-semibold text-burgundy"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedOrder(o)}
                          className="px-3 py-1 bg-burgundy hover:bg-burgundy-800 text-white rounded-lg text-xs font-semibold"
                        >
                          Inspect
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB 5: STORE SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-3xl border border-gold-border p-6 sm:p-10 shadow-subtle max-w-3xl mx-auto">
            <h2 className="font-serif text-2xl font-bold text-burgundy mb-2">
              Store & Integration Settings
            </h2>
            <p className="text-xs text-charcoal-muted mb-6">
              Update your centralized WhatsApp Business contact, Instagram handle, and delivery fees.
            </p>

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs sm:text-sm">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Store Name */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">Store Name</label>
                  <input
                    type="text"
                    value={settings.storeName}
                    onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                    className="w-full px-3 py-2 bg-cream-50 border border-gold-border rounded-xl text-xs focus:outline-none"
                  />
                </div>

                {/* Tagline */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">Tagline</label>
                  <input
                    type="text"
                    value={settings.tagline}
                    onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                    className="w-full px-3 py-2 bg-cream-50 border border-gold-border rounded-xl text-xs focus:outline-none"
                  />
                </div>

                {/* WhatsApp Phone (Digits Only) */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    WhatsApp Number (Digits Only, e.g. 919876543210)
                  </label>
                  <input
                    type="text"
                    value={settings.whatsappNumber}
                    onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-cream-50 border border-gold-border rounded-xl text-xs focus:outline-none font-mono"
                  />
                </div>

                {/* WhatsApp Display Text */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    WhatsApp Display Format (e.g. +91 98765 43210)
                  </label>
                  <input
                    type="text"
                    value={settings.whatsappDisplay}
                    onChange={(e) => setSettings({ ...settings, whatsappDisplay: e.target.value })}
                    className="w-full px-3 py-2 bg-cream-50 border border-gold-border rounded-xl text-xs focus:outline-none"
                  />
                </div>

                {/* Instagram Handle */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">Instagram Handle</label>
                  <input
                    type="text"
                    value={settings.instagramHandle}
                    onChange={(e) => setSettings({ ...settings, instagramHandle: e.target.value })}
                    className="w-full px-3 py-2 bg-cream-50 border border-gold-border rounded-xl text-xs focus:outline-none"
                  />
                </div>

                {/* Instagram Profile URL */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">Instagram URL</label>
                  <input
                    type="url"
                    value={settings.instagramUrl}
                    onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-cream-50 border border-gold-border rounded-xl text-xs focus:outline-none"
                  />
                </div>

                {/* Free Shipping Threshold */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">Free Shipping Threshold (₹)</label>
                  <input
                    type="number"
                    value={settings.freeShippingThreshold}
                    onChange={(e) => setSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-cream-50 border border-gold-border rounded-xl text-xs focus:outline-none"
                  />
                </div>

                {/* Standard Shipping Fee */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">Standard Shipping Fee (₹)</label>
                  <input
                    type="number"
                    value={settings.standardShippingFee}
                    onChange={(e) => setSettings({ ...settings, standardShippingFee: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-cream-50 border border-gold-border rounded-xl text-xs focus:outline-none"
                  />
                </div>

              </div>

              {/* Announcement Bar Text */}
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Announcement Bar Message</label>
                <input
                  type="text"
                  value={settings.announcementText}
                  onChange={(e) => setSettings({ ...settings, announcementText: e.target.value })}
                  className="w-full px-3 py-2 bg-cream-50 border border-gold-border rounded-xl text-xs focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-gold-border flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-burgundy hover:bg-burgundy-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-sm"
                >
                  Save Store Settings
                </button>
              </div>

            </form>
          </div>
        )}

      </div>

      {/* PRODUCT EDIT / ADD MODAL */}
      {isProductModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-charcoal/50 backdrop-blur-xs" onClick={() => setIsProductModalOpen(false)} />
          <div className="bg-white rounded-3xl border border-gold-border max-w-2xl w-full p-6 shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-gold-border mb-4">
              <h3 className="font-serif text-xl font-bold text-burgundy">
                {editingProduct.id ? 'Edit Accessory' : 'Add New Hair Accessory'}
              </h3>
              <button type="button" onClick={() => setIsProductModalOpen(false)}>
                <X className="w-5 h-5 text-charcoal" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full px-3 py-2 bg-cream-50 border border-gold-border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Category *</label>
                  <select
                    value={editingProduct.category || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full px-3 py-2 bg-cream-50 border border-gold-border rounded-xl"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">SKU</label>
                  <input
                    type="text"
                    value={editingProduct.sku || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                    className="w-full px-3 py-2 bg-cream-50 border border-gold-border rounded-xl font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-cream-50 border border-gold-border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={editingProduct.originalPrice || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-cream-50 border border-gold-border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Total Stock</label>
                  <input
                    type="number"
                    value={editingProduct.stock || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-cream-50 border border-gold-border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Product Description</label>
                <textarea
                  rows={3}
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full px-3 py-2 bg-cream-50 border border-gold-border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Image URL / Path</label>
                <input
                  type="text"
                  value={editingProduct.images?.[0] || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, images: [e.target.value] })}
                  placeholder="/images/products/tortoise-claw-1.svg or custom URL"
                  className="w-full px-3 py-2 bg-cream-50 border border-gold-border rounded-xl"
                />
              </div>

              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.isFeatured || false}
                    onChange={(e) => setEditingProduct({ ...editingProduct, isFeatured: e.target.checked })}
                  />
                  <span>Featured Showpiece</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.isNewArrival || false}
                    onChange={(e) => setEditingProduct({ ...editingProduct, isNewArrival: e.target.checked })}
                  />
                  <span>New Arrival</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.isBestSeller || false}
                    onChange={(e) => setEditingProduct({ ...editingProduct, isBestSeller: e.target.checked })}
                  />
                  <span>Best Seller</span>
                </label>
              </div>

              <div className="pt-4 border-t border-gold-border flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 bg-cream-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-burgundy text-white font-bold rounded-xl"
                >
                  Save Accessory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CATEGORY EDIT / ADD MODAL */}
      {isCategoryModalOpen && editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-charcoal/50 backdrop-blur-xs" onClick={() => setIsCategoryModalOpen(false)} />
          <div className="bg-white rounded-3xl border border-gold-border max-w-md w-full p-6 shadow-2xl z-10">
            <h3 className="font-serif text-lg font-bold text-burgundy mb-3">
              {editingCategory.id ? 'Edit Category' : 'Add Category'}
            </h3>
            <form onSubmit={handleSaveCategory} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={editingCategory.name || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  className="w-full px-3 py-2 bg-cream-50 border border-gold-border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Description</label>
                <input
                  type="text"
                  value={editingCategory.description || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                  className="w-full px-3 py-2 bg-cream-50 border border-gold-border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Display Index (Order)</label>
                <input
                  type="number"
                  value={editingCategory.displayOrder || 1}
                  onChange={(e) => setEditingCategory({ ...editingCategory, displayOrder: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-cream-50 border border-gold-border rounded-xl"
                />
              </div>
              <div className="pt-3 border-t border-gold-border flex justify-end gap-2">
                <button type="button" onClick={() => setIsCategoryModalOpen(false)} className="px-4 py-2 bg-cream-100 rounded-xl">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-burgundy text-white font-bold rounded-xl">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ORDER INSPECTION MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-charcoal/50 backdrop-blur-xs" onClick={() => setSelectedOrder(null)} />
          <div className="bg-white rounded-3xl border border-gold-border max-w-2xl w-full p-6 shadow-2xl z-10 max-h-[90vh] overflow-y-auto space-y-4 text-xs">
            
            <div className="flex justify-between items-center pb-3 border-b border-gold-border">
              <div>
                <span className="font-serif text-lg font-bold text-burgundy block">Order {selectedOrder.id}</span>
                <span className="text-[11px] text-charcoal-muted">Recorded: {new Date(selectedOrder.createdAt).toLocaleString('en-IN')}</span>
              </div>
              <button type="button" onClick={() => setSelectedOrder(null)}>
                <X className="w-5 h-5 text-charcoal" />
              </button>
            </div>

            {/* Customer Info */}
            <div className="p-3 bg-cream-50 rounded-xl space-y-1">
              <p><strong>Customer:</strong> {selectedOrder.customer.fullName}</p>
              <p><strong>Phone:</strong> {selectedOrder.customer.phone} | <strong>WhatsApp:</strong> {selectedOrder.customer.whatsappNumber}</p>
              <p><strong>Address:</strong> {selectedOrder.customer.addressLine1}, {selectedOrder.customer.city}, {selectedOrder.customer.state} — {selectedOrder.customer.pinCode}</p>
              {selectedOrder.customer.deliveryInstructions && (
                <p className="text-burgundy"><strong>Delivery Instructions:</strong> {selectedOrder.customer.deliveryInstructions}</p>
              )}
            </div>

            {/* Items */}
            <div className="space-y-2">
              <h4 className="font-bold text-burgundy uppercase text-[10px]">Purchased Items</h4>
              <div className="border border-gold-border rounded-xl divide-y divide-cream-200">
                {selectedOrder.items.map((it, idx) => (
                  <div key={idx} className="p-2.5 flex justify-between items-center">
                    <div>
                      <span className="font-semibold text-charcoal">{it.name}</span>
                      {it.variantName && <span className="text-charcoal-muted ml-1">({it.variantName})</span>}
                      <span className="text-charcoal-muted ml-2">× {it.quantity}</span>
                    </div>
                    <span className="font-bold text-burgundy">₹{it.subtotal}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Summary */}
            <div className="flex justify-between items-center p-3 bg-cream-100 rounded-xl font-semibold">
              <span>Total Amount:</span>
              <span className="font-serif text-base text-burgundy">₹{selectedOrder.total}</span>
            </div>

            {/* Quick Status Modifiers */}
            <div className="space-y-3 pt-2 border-t border-gold-border">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Order Status</label>
                  <select
                    value={selectedOrder.orderStatus}
                    onChange={(e) => handleUpdateOrderStatus(selectedOrder.id, { orderStatus: e.target.value as any })}
                    className="w-full p-2 bg-cream-50 border border-gold-border rounded-xl"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1">Payment Status</label>
                  <select
                    value={selectedOrder.paymentStatus}
                    onChange={(e) => handleUpdateOrderStatus(selectedOrder.id, { paymentStatus: e.target.value as any })}
                    className="w-full p-2 bg-cream-50 border border-gold-border rounded-xl"
                  >
                    <option value="pending">Pending</option>
                    <option value="cod_pending">COD Pending</option>
                    <option value="paid">Paid</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Tracking Courier AWB Number</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    defaultValue={selectedOrder.trackingNumber || ''}
                    placeholder="e.g. BLUEDART-894101"
                    id="trackingInput"
                    className="flex-1 p-2 bg-cream-50 border border-gold-border rounded-xl font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.getElementById('trackingInput') as HTMLInputElement;
                      if (input) {
                        handleUpdateOrderStatus(selectedOrder.id, { trackingNumber: input.value });
                      }
                    }}
                    className="px-4 py-2 bg-burgundy text-white font-bold rounded-xl"
                  >
                    Update Tracking
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-gold-border flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2 bg-cream-200 text-charcoal font-semibold rounded-xl"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
