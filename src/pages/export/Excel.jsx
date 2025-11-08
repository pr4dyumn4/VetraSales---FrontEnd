import React from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

function Excel() {

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Product Reviews");

    worksheet.columns = [
      { header: 'Product Name', key: 'productName' },
      { header: 'Description', key: 'productDescription' },
      { header: 'Price', key: 'productPrice' },
      { header: 'Added By', key: 'productAdmin' },
      { header: 'Customer Name', key: 'username' },
      { header: 'Email', key: 'email' },
      { header: 'Rating', key: 'rating' },
      { header: 'Comment', key: 'comment' },
    ];

    const reviewBlocks = document.querySelectorAll(".reviews-list > div");
    
    reviewBlocks.forEach(block => {
      const productTds = block.querySelectorAll("table td");
      const productName = productTds[1]?.innerText || "N/A";
      const description = productTds[2]?.innerText || "N/A";
      const price = productTds[3]?.innerText || "N/A";
      const addedBy = productTds[4]?.innerText || "N/A";

      const username = block.querySelector("p:nth-of-type(1)")?.innerText.replace("Customer name: ", "") || "N/A";
      const email = block.querySelector("p:nth-of-type(2)")?.innerText.replace("Email: ", "") || "N/A";
      const rating = block.querySelector("p:nth-of-type(3)")?.innerText.replace("Rating: ", "") || "N/A";
      const comment = block.querySelector("p:nth-of-type(4)")?.innerText.replace("Comment: ", "") || "N/A";

      worksheet.addRow({
        productName,
        productDescription: description,
        productPrice: price,
        productAdmin: addedBy,
        username,
        email,
        rating,
        comment,
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), 'ProductReviews.xlsx');
  };

  return (
    <button onClick={exportToExcel}>
      Export Reviews to Excel
    </button>
  );
}

export default Excel;
