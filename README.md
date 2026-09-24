# Surplus to Shelter

A small browser demo for the AmiHacks Track A food rescue challenge. It uses plain HTML, CSS, and JavaScript, so there are no packages to install.

## Open it in VS Code on Windows

1. Open VS Code.
2. Choose **File → Open Folder...** and select this `surplus-to-shelter` folder.
3. In the Explorer, open `index.html`.
4. Right-click in the editor and choose **Open with Live Server** if you already have the Live Server extension. If you don't, you can open File Explorer and double-click `index.html` to use your browser.
5. Try **Add donation**, enter a food item and area, then look at its suggested recipient. Click **Dispatch** to assign the demo driver or mark a pickup complete.

The app saves changes in the browser's local storage. **Reset sample data** restores the starting example. To show someone else, share this folder and have them open it in their own browser.

## What the demo does

- Records food, quantity, unit, pickup area, donor name, and ready-by time.
- Suggests a recipient using an area match, the recipient's listed food needs, and available capacity for meal donations.
- Shows matched pickups in a dispatch view; demo buttons assign a sample volunteer and update pickup status.
- Shows donation, completed pickup, and waiting pickup counts.
- Stores data in the current browser only.

## What is simplified

Locations are typed as neighborhood names; there is no map, GPS, or actual distance calculation. Recipient and volunteer information is sample data. The driver assignment and notifications are not connected to real people, and there is no shared database or multi-user sync. The food category is guessed from a few words in the item name. Explain these limits if you present the demo.

## Files

- `index.html` — page sections and form
- `style.css` — layout and colors
- `app.js` — sample records, matching, and interactions
