# The auction house: Camelot's pieces over 1.14.2's AuctionFrame

Built 2026-09-29 (session 35, unattended; the P3 list's item 24). ForeverUI 0.108.0, skin part `auction` (in `SkinMerchant.lua`:
no new TOC file without a client restart). Sources: Forever's `Blizzard_AuctionHouseUI` TOC; 1.14.2's `AuctionUI.xml` (4216170)
and its art (`Interface\AuctionFrame`). No Forever shot of the auction house.

## Forever and 1.14.2

- **Forever** loads retail's auction house (Blizzard_AuctionHouseUI, `AllowLoadGameType: mainline, cata, mists`: Camelot is of the
  mainline family): categories on the left, a search bar, a sortable list of items, Buy / Sell / Auctions. A different window over
  a different API (C_AuctionHouse); rebuilding it over 1.14.2's classic calls would be a project of its own (open item).
- **1.14.2** keeps the classic Browse / Bids / Auctions window (832 x 447), but its art is already the updated look: a stone frame
  with a portrait ring and dark insets, drawn about 10 px in from the window's edges.

## The skin

- Camelot's metal laid on the art's own border (TOPLEFT (10, -12), BOTTOMRIGHT (-2, 6)): its ring lands on the art's ring, the
  auctioneer's portrait in it; each page's title (Browse Auctions, Bid, "<name>'s Auctions") on the metal.
- Forever's tabs under the metal, 3 apart; the pages' buttons in red; the three lists' scroll bars minimal
  (`ns.SkinMinimalScrollFrame`, now in Widgets.lua, shared with the Friends window); the red close button; the settings arrow.
- The game's art stays (the insets, the fields' frames, the filter list); the game keeps searching, bidding and posting.

## In game (2026-09-29)

At Auctioneer Redmuse (Ironforge): Browse and Auctions as described. Not tried: a search, a bid, posting an item.
