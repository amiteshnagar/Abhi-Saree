// =============================================================================
// AddProductForm Component — Abhi Saree Collection (React Practice)
// Phase 6.11: React Forms, Controlled Inputs & Client-Side Validation
// =============================================================================

import { useState } from 'react'

// =============================================================================
// 🎓 BEGINNER'S GUIDE TO CONTROLLED INPUTS & FORMS IN REACT:
//
// 1. WHAT IS A CONTROLLED INPUT?
//    In standard HTML, input elements (like <input> or <select>) hold and track
//    their own internal state in the browser DOM.
//    In React, a "Controlled Input" delegates control to React state:
//      - `value={state}` dictates what the input displays (single source of truth).
//      - `onChange={(e) => setState(e.target.value)}` updates React state on every keystroke.
//
// 2. WHY USE event.preventDefault()?
//    By default, submitting a web form reloads the browser page or sends a GET/POST request.
//    In a single-page React app, `event.preventDefault()` prevents this browser reload,
//    allowing our JavaScript handler to validate inputs and update React state seamlessly.
//
// 3. SEPARATION OF CONCERNS:
//    Notice that this form component ONLY manages its own local input state
//    (`name`, `category`, `price`, and `errors`). It does NOT manage the global catalogue.
//    When the form is valid, it calls the `onAddProduct(...)` callback provided by App.jsx.
// =============================================================================

function AddProductForm({ supportedCategories, onAddProduct }) {
  // ---------------------------------------------------------------------------
  // 1. Local Form State (Controlled Inputs)
  // ---------------------------------------------------------------------------
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')

  // 2. Validation Errors & Feedback State
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  // ---------------------------------------------------------------------------
  // Form Submission & Validation Handler
  // ---------------------------------------------------------------------------
  function handleSubmit(event) {
    // Prevent the default browser form submission (which would reload the page)
    event.preventDefault()

    const newErrors = {}
    const trimmedName = name.trim()
    const numericPrice = Number(price)

    // Rule 1: Saree Name must be non-empty after trimming
    if (!trimmedName) {
      newErrors.name = 'Please enter a saree name.'
    }

    // Rule 2: Category must be selected and match supported catalog categories
    if (!category || !supportedCategories.includes(category)) {
      newErrors.category = 'Please select a valid fabric category from the list.'
    }

    // Rule 3: Price must be a valid positive number
    if (!price || isNaN(numericPrice) || numericPrice <= 0) {
      newErrors.price = 'Please enter a valid price greater than ₹0.'
    }

    // If any validation errors exist, display them and halt submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setSuccessMessage('')
      return
    }

    // Success: Pass sanitized product object to parent component
    onAddProduct({
      name: trimmedName,
      category,
      price: numericPrice,
    })

    // Reset controlled inputs and validation states
    setName('')
    setCategory('')
    setPrice('')
    setErrors({})
    setSuccessMessage(`✨ Saree "${trimmedName}" was added to the collection!`)
  }

  // Clear specific error and success message when user edits a field
  function handleNameChange(e) {
    setName(e.target.value)
    if (errors.name) setErrors((prev) => ({ ...prev, name: '' }))
    if (successMessage) setSuccessMessage('')
  }

  function handleCategoryChange(e) {
    setCategory(e.target.value)
    if (errors.category) setErrors((prev) => ({ ...prev, category: '' }))
    if (successMessage) setSuccessMessage('')
  }

  function handlePriceChange(e) {
    setPrice(e.target.value)
    if (errors.price) setErrors((prev) => ({ ...prev, price: '' }))
    if (successMessage) setSuccessMessage('')
  }

  return (
    <section className="add-saree-form-section" aria-labelledby="form-heading">
      <div className="form-header-badge">React Controlled Form</div>
      <h3 id="form-heading" className="add-saree-form-title">
        Add Sample Saree Form
      </h3>
      <p className="add-saree-form-subtext">
        Test controlled inputs, live validation, and state immutability.
      </p>

      {/* Success Notification Alert */}
      {successMessage && (
        <div
          className="form-success-banner"
          role="status"
          aria-live="polite"
          data-testid="form-success-banner"
        >
          {successMessage}
        </div>
      )}

      {/* Controlled Form */}
      <form
        className="add-saree-form"
        onSubmit={handleSubmit}
        noValidate
        data-testid="add-saree-form"
      >
        <div className="form-grid-row">
          {/* 1. Saree Name Input */}
          <div className="form-group">
            <label htmlFor="saree-name-input" className="form-label">
              Saree Name <span className="required-star">*</span>
            </label>
            <input
              id="saree-name-input"
              type="text"
              className={`form-input ${errors.name ? 'input-error' : ''}`}
              placeholder="e.g. Royal Indigo Katan Saree"
              value={name}
              onChange={handleNameChange}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'saree-name-error' : undefined}
              data-testid="form-name-input"
            />
            {errors.name && (
              <p
                id="saree-name-error"
                className="form-error-text"
                role="alert"
                data-testid="form-name-error"
              >
                {errors.name}
              </p>
            )}
          </div>

          {/* 2. Fabric Category Select */}
          <div className="form-group">
            <label htmlFor="saree-category-select" className="form-label">
              Fabric Category <span className="required-star">*</span>
            </label>
            <select
              id="saree-category-select"
              className={`form-select ${errors.category ? 'input-error' : ''}`}
              value={category}
              onChange={handleCategoryChange}
              aria-invalid={Boolean(errors.category)}
              aria-describedby={errors.category ? 'saree-category-error' : undefined}
              data-testid="form-category-select"
            >
              <option value="">-- Select Category --</option>
              {supportedCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <p
                id="saree-category-error"
                className="form-error-text"
                role="alert"
                data-testid="form-category-error"
              >
                {errors.category}
              </p>
            )}
          </div>

          {/* 3. Illustrative Price Input */}
          <div className="form-group">
            <label htmlFor="saree-price-input" className="form-label">
              Illustrative Price (₹) <span className="required-star">*</span>
            </label>
            <input
              id="saree-price-input"
              type="number"
              min="1"
              step="1"
              className={`form-input ${errors.price ? 'input-error' : ''}`}
              placeholder="e.g. 7500"
              value={price}
              onChange={handlePriceChange}
              aria-invalid={Boolean(errors.price)}
              aria-describedby={errors.price ? 'saree-price-error' : undefined}
              data-testid="form-price-input"
            />
            {errors.price && (
              <p
                id="saree-price-error"
                className="form-error-text"
                role="alert"
                data-testid="form-price-error"
              >
                {errors.price}
              </p>
            )}
          </div>
        </div>

        {/* Submit Action */}
        <div className="form-actions-row">
          <button
            type="submit"
            className="submit-saree-btn"
            data-testid="form-submit-btn"
          >
            Add Saree to Collection
          </button>
        </div>
      </form>
    </section>
  )
}

export default AddProductForm
