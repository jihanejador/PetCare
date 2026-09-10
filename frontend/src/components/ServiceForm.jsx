import { useState, useEffect } from 'react';

export default function ServiceForm({ categories, initialData, onSubmit, isLoading }) {
  const emptyForm = {
    title: '',
    category_id: '',
    price: '',
    description: '',
  };

  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        category_id: initialData.category_id || '',
        price: initialData.price || '',
        description: initialData.description || '',
      });
    } else {
      setFormData(emptyForm);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const success = await onSubmit(formData, setErrors);

    if (success !== false) {
      setFormData(emptyForm);
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
      <h2 className="text-xl font-bold text-[#0c3239]">
        {initialData ? 'Modifier le service' : 'Publier un nouveau service'}
      </h2>

      <div>
        <label className="block text-xs font-bold text-gray-700 mb-1">Titre du service *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2.5 border rounded-xl bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title[0]}</p>}
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-700 mb-1">Catégorie *</label>
        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          className="w-full p-2.5 border rounded-xl bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="">Sélectionner une catégorie</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.category_id && <p className="text-red-500 text-xs mt-1">{errors.category_id[0]}</p>}
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-700 mb-1">Prix (DH / heure) *</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2.5 border rounded-xl bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price[0]}</p>}
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-700 mb-1">Description *</label>
        <textarea
          name="description"
          rows="3"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2.5 border rounded-xl bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        ></textarea>
        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description[0]}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-[#0c3239] hover:bg-[#144953] text-white font-bold rounded-xl text-sm transition-all"
      >
        {isLoading ? 'Enregistrement...' : initialData ? 'Enregistrer les modifications' : 'Publier le service'}
      </button>
    </form>
  );
}