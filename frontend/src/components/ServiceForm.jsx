import { useState, useEffect } from 'react';

export default function ServiceForm({ initialData = null, categories = [], onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    title: '',
    category_id: '',
    price: '',
    description: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        category_id: initialData.category_id || '',
        price: initialData.price || '',
        description: initialData.description || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, setErrors);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-xl mx-auto">
      <h3 className="text-2xl font-bold text-[#0c3239] mb-6">
        {initialData ? 'Modifier le service' : 'Publier un nouveau service'}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Titre */}
        <div>
          <label className="block text-sm font-semibold text-[#0c3239]">Titre du service *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ex: Garde de chiens à domicile"
            className="w-full mt-1 p-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8ea473]"
            required
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title[0]}</p>}
        </div>

        {/* Catégorie & Prix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#0c3239]">Catégorie *</label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="w-full mt-1 p-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8ea473]"
              required
            >
              <option value="">Sélectionner...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            {errors.category_id && <p className="text-red-500 text-xs mt-1">{errors.category_id[0]}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#0c3239]">Prix (DH / heure) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              placeholder="150"
              className="w-full mt-1 p-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8ea473]"
              required
            />
            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price[0]}</p>}
          </div>
        </div>

        {/* Description (Max 1000) */}
        <div>
          <div className="flex justify-between items-center">
            <label className="block text-sm font-semibold text-[#0c3239]">Description *</label>
            <span className="text-xs text-gray-400">{formData.description.length}/1000</span>
          </div>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            maxLength={1000}
            rows={4}
            placeholder="Décrivez votre service en détail..."
            className="w-full mt-1 p-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8ea473]"
            required
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description[0]}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#0c3239] hover:bg-[#15464f] text-white font-medium py-3 rounded-xl transition duration-200"
        >
          {isLoading ? 'Enregistrement...' : initialData ? 'Mettre à jour' : 'Publier le service'}
        </button>
      </form>
    </div>
  );
}