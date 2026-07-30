document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('calculatorForm');
    const totalSpan = document.getElementById('totalCost');
    const timelineSpan = document.getElementById('timeline');

    // Base costs per category
    const typeCosts = {
        business: 800,
        ecommerce: 1500,
        portfolio: 500,
        blog: 600
    };

    const pageCost = 50; // per page
    const designCosts = {
        template: 0,
        premium: 300,
        custom: 800
    };

    const addonCosts = {
        contact: 100,
        blog: 200,
        seo: 250,
        booking: 350
    };

    function calculate() {
        const type = document.getElementById('websiteType').value;
        const pages = parseInt(document.getElementById('pages').value) || 1;
        const design = document.getElementById('designLevel').value;

        // Base
        let total = typeCosts[type] || 0;
        total += pages * pageCost;
        total += designCosts[design] || 0;

        // Add‑ons
        const checkboxes = document.querySelectorAll('.addons input[type="checkbox"]');
        checkboxes.forEach(cb => {
            if (cb.checked) {
                total += addonCosts[cb.value] || 0;
            }
        });

        totalSpan.textContent = '$' + total.toLocaleString();

        // Simple timeline based on complexity
        let weeks = 2;
        if (pages > 10) weeks += 1;
        if (design === 'custom') weeks += 2;
        if (type === 'ecommerce') weeks += 2;
        timelineSpan.textContent = `Planning (1 week) → Development (${weeks} weeks) → Testing (1 week)`;
    }

    // Attach event listeners to all inputs
    const inputs = form.querySelectorAll('select, input');
    inputs.forEach(input => {
        input.addEventListener('change', calculate);
        input.addEventListener('input', calculate);
    });

    // Initial calculation
    calculate();
});
