import React, { useState } from 'react';
import { Users, Target, TrendingUp, Award, DollarSign, Plus, Edit2, Trash2, UserCheck, X } from 'lucide-react';

const CRMSystem = () => {
  const [partners] = useState([
    { id: 1, name: 'Tutte', color: 'bg-blue-500' },
    { id: 2, name: 'Vompo', color: 'bg-green-500' },
    { id: 3, name: 'Emilio', color: 'bg-purple-500' }
  ]);

  const [contacts, setContacts] = useState([]);
  const [showContactForm, setShowContactForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard'); // dashboard, contacts

  const [newContact, setNewContact] = useState({
    company: '',
    contactName: '',
    email: '',
    phone: '',
    assignedTo: 1,
    status: 'contacted',
    dealValue: 5000,
    notes: ''
  });

  const [settings] = useState({
    weeklyContactGoal: 20,
    minConfirmedGoal: 2,
    commission: 15,
    avgDealValue: 5000
  });

  const statusOptions = [
    { value: 'contacted', label: '📞 Contactado', color: 'bg-blue-500' },
    { value: 'meeting', label: '🤝 Reunión agendada', color: 'bg-yellow-500' },
    { value: 'proposal', label: '📄 Propuesta enviada', color: 'bg-orange-500' },
    { value: 'negotiation', label: '💬 En negociación', color: 'bg-purple-500' },
    { value: 'closed', label: '✅ Venta cerrada', color: 'bg-green-500' },
    { value: 'lost', label: '❌ Perdido', color: 'bg-red-500' }
  ];

  const handleAddContact = () => {
    if (editingContact) {
      setContacts(contacts.map(c => c.id === editingContact.id ? { ...newContact, id: c.id } : c));
      setEditingContact(null);
    } else {
      setContacts([...contacts, { ...newContact, id: Date.now() }]);
    }
    resetForm();
  };

  const resetForm = () => {
    setNewContact({
      company: '',
      contactName: '',
      email: '',
      phone: '',
      assignedTo: 1,
      status: 'contacted',
      dealValue: 5000,
      notes: ''
    });
    setShowContactForm(false);
  };

  const handleEditContact = (contact) => {
    setNewContact(contact);
    setEditingContact(contact);
    setShowContactForm(true);
  };

  const handleDeleteContact = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este contacto?')) {
      setContacts(contacts.filter(c => c.id !== id));
    }
  };

  const getPartnerStats = (partnerId) => {
    const partnerContacts = contacts.filter(c => c.assignedTo === partnerId);
    const contacted = partnerContacts.length;
    const closed = partnerContacts.filter(c => c.status === 'closed').length;
    const totalRevenue = partnerContacts
      .filter(c => c.status === 'closed')
      .reduce((sum, c) => sum + c.dealValue, 0);
    const commission = totalRevenue * settings.commission / 100;

    return { contacted, closed, totalRevenue, commission };
  };

  const totalContacts = contacts.length;
  const totalClosed = contacts.filter(c => c.status === 'closed').length;
  const totalRevenue = contacts.filter(c => c.status === 'closed').reduce((sum, c) => sum + c.dealValue, 0);

  const getStatusLabel = (status) => statusOptions.find(s => s.value === status)?.label || status;
  const getStatusColor = (status) => statusOptions.find(s => s.value === status)?.color || 'bg-gray-500';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-2xl p-8 mb-8 shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                <TrendingUp className="w-10 h-10" />
                CRM - Gestión de Ventas
              </h1>
              <p className="text-orange-100 text-lg">Software para Empresas de Retroexcavación</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`px-6 py-3 rounded-lg transition-all font-semibold ${
                  currentView === 'dashboard'
                    ? 'bg-white text-orange-600'
                    : 'bg-white/20 hover:bg-white/30 text-white'
                }`}
              >
                📊 Dashboard
              </button>
              <button
                onClick={() => setCurrentView('contacts')}
                className={`px-6 py-3 rounded-lg transition-all font-semibold ${
                  currentView === 'contacts'
                    ? 'bg-white text-orange-600'
                    : 'bg-white/20 hover:bg-white/30 text-white'
                }`}
              >
                👥 Contactos
              </button>
            </div>
          </div>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-semibold mb-1">Total Contactos</p>
                <p className="text-4xl font-bold text-white">{totalContacts}</p>
              </div>
              <Users className="w-12 h-12 text-blue-200" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-semibold mb-1">Ventas Cerradas</p>
                <p className="text-4xl font-bold text-white">{totalClosed}</p>
              </div>
              <Award className="w-12 h-12 text-green-200" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-semibold mb-1">Ingresos Totales</p>
                <p className="text-4xl font-bold text-white">${totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-12 h-12 text-purple-200" />
            </div>
          </div>
        </div>

        {/* Dashboard View */}
        {currentView === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {partners.map(partner => {
              const stats = getPartnerStats(partner.id);
              const partnerContacts = contacts.filter(c => c.assignedTo === partner.id);

              return (
                <div key={partner.id} className="bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-700">
                  <h2 className="text-2xl font-bold text-white mb-6">{partner.name}</h2>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-900 rounded-lg p-4">
                      <p className="text-slate-400 text-xs mb-1">Contactos</p>
                      <p className="text-3xl font-bold text-white">{stats.contacted}</p>
                    </div>
                    <div className="bg-slate-900 rounded-lg p-4">
                      <p className="text-slate-400 text-xs mb-1">Cerrados</p>
                      <p className="text-3xl font-bold text-green-400">{stats.closed}</p>
                    </div>
                    <div className="bg-slate-900 rounded-lg p-4">
                      <p className="text-slate-400 text-xs mb-1">Ingresos</p>
                      <p className="text-xl font-bold text-white">${stats.totalRevenue.toLocaleString()}</p>
                    </div>
                    <div className="bg-gradient-to-br from-orange-500/20 to-amber-600/20 rounded-lg p-4 border border-orange-500/30">
                      <p className="text-orange-300 text-xs mb-1">Comisión</p>
                      <p className="text-xl font-bold text-orange-400">${stats.commission.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Recent Contacts */}
                  <div className="bg-slate-900 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-slate-300 mb-3">Contactos recientes</h3>
                    {partnerContacts.length === 0 ? (
                      <p className="text-slate-500 text-sm">Sin contactos asignados</p>
                    ) : (
                      <div className="space-y-2">
                        {partnerContacts.slice(0, 3).map(contact => (
                          <div key={contact.id} className="flex items-center justify-between text-sm">
                            <span className="text-slate-300 truncate">{contact.company}</span>
                            <span className={`${getStatusColor(contact.status)} text-white text-xs px-2 py-1 rounded`}>
                              {getStatusLabel(contact.status).split(' ')[0]}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Contacts View */}
        {currentView === 'contacts' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Gestión de Contactos</h2>
              <button
                onClick={() => setShowContactForm(true)}
                className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg transition-all"
              >
                <Plus className="w-5 h-5" />
                Agregar Contacto
              </button>
            </div>

            {/* Contact Form Modal */}
            {showContactForm && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-slate-800 rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-700">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-white">
                      {editingContact ? 'Editar Contacto' : 'Nuevo Contacto'}
                    </h3>
                    <button
                      onClick={() => {
                        resetForm();
                        setEditingContact(null);
                      }}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 mb-2 font-semibold">Empresa *</label>
                      <input
                        type="text"
                        value={newContact.company}
                        onChange={(e) => setNewContact({...newContact, company: e.target.value})}
                        className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-orange-500 focus:outline-none"
                        placeholder="Excavaciones S.A."
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-2 font-semibold">Nombre del contacto *</label>
                      <input
                        type="text"
                        value={newContact.contactName}
                        onChange={(e) => setNewContact({...newContact, contactName: e.target.value})}
                        className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-orange-500 focus:outline-none"
                        placeholder="Juan Pérez"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-2 font-semibold">Email</label>
                      <input
                        type="email"
                        value={newContact.email}
                        onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                        className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-orange-500 focus:outline-none"
                        placeholder="contacto@empresa.com"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-2 font-semibold">Teléfono</label>
                      <input
                        type="tel"
                        value={newContact.phone}
                        onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                        className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-orange-500 focus:outline-none"
                        placeholder="+54 351 123 4567"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-2 font-semibold">Asignado a *</label>
                      <select
                        value={newContact.assignedTo}
                        onChange={(e) => setNewContact({...newContact, assignedTo: parseInt(e.target.value)})}
                        className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-orange-500 focus:outline-none"
                      >
                        {partners.map(p => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-2 font-semibold">Estado</label>
                      <select
                        value={newContact.status}
                        onChange={(e) => setNewContact({...newContact, status: e.target.value})}
                        className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-orange-500 focus:outline-none"
                      >
                        {statusOptions.map(s => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-2 font-semibold">Valor estimado (USD)</label>
                      <input
                        type="number"
                        value={newContact.dealValue}
                        onChange={(e) => setNewContact({...newContact, dealValue: parseInt(e.target.value) || 0})}
                        className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-orange-500 focus:outline-none"
                        placeholder="5000"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-slate-300 mb-2 font-semibold">Notas</label>
                      <textarea
                        value={newContact.notes}
                        onChange={(e) => setNewContact({...newContact, notes: e.target.value})}
                        className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-orange-500 focus:outline-none"
                        rows="3"
                        placeholder="Información adicional sobre el contacto..."
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={handleAddContact}
                      disabled={!newContact.company || !newContact.contactName}
                      className="flex-1 bg-gradient-to-r from-orange-500 to-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {editingContact ? 'Actualizar' : 'Guardar'}
                    </button>
                    <button
                      onClick={() => {
                        resetForm();
                        setEditingContact(null);
                      }}
                      className="px-6 py-3 bg-slate-700 text-white rounded-lg font-semibold hover:bg-slate-600 transition-all"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Contacts Table */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
              {contacts.length === 0 ? (
                <div className="p-12 text-center">
                  <Users className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 text-lg">No hay contactos registrados</p>
                  <p className="text-slate-500 text-sm mt-2">Agregá tu primer contacto para comenzar</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-900">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase">Empresa</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase">Contacto</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase">Email</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase">Teléfono</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase">Asignado</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase">Estado</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase">Valor</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                      {contacts.map(contact => {
                        const assignedPartner = partners.find(p => p.id === contact.assignedTo);
                        return (
                          <tr key={contact.id} className="hover:bg-slate-700/50 transition-colors">
                            <td className="px-6 py-4 text-white font-semibold">{contact.company}</td>
                            <td className="px-6 py-4 text-slate-300">{contact.contactName}</td>
                            <td className="px-6 py-4 text-slate-400 text-sm">{contact.email || '-'}</td>
                            <td className="px-6 py-4 text-slate-400 text-sm">{contact.phone || '-'}</td>
                            <td className="px-6 py-4">
                              <span className={`${assignedPartner?.color} text-white text-xs px-3 py-1 rounded-full font-semibold`}>
                                {assignedPartner?.name}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`${getStatusColor(contact.status)} text-white text-xs px-3 py-1 rounded-full`}>
                                {getStatusLabel(contact.status)}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-white font-semibold">${contact.dealValue.toLocaleString()}</td>
                            <td className="px-6 py-4">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleEditContact(contact)}
                                  className="text-blue-400 hover:text-blue-300 transition-colors"
                                  title="Editar"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteContact(contact.id)}
                                  className="text-red-400 hover:text-red-300 transition-colors"
                                  title="Eliminar"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CRMSystem;
