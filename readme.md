## What I did

- followed http://bost.ocks.org/mike/map/ (but without topojson).
- applied it to japan map.

## Geo data

- admin 0 sub units (http://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-admin-0-details/)
- populated places (http://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-populated-places/)
- admin 0 label points (http://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-cultural-building-blocks/)
- admin 1 states/provinces (http://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-admin-1-states-provinces/)

## translations


```
# uk
$ ogr2ogr -f GeoJSON -where "ADM0_A3 IN ('GBR', 'IRL')" subunits.json ./ne_10m_admin_0_map_subunits/ne_10m_admin_0_map_subunits.shp
$ ogr2ogr -f GeoJSON -where "ISO_A2 = 'GB' AND SCALERANK < 8" places.json ./ne_10m_populated_places/ne_10m_populated_places.shp
$ ogr2ogr -f GeoJSON -where "SR_ADM0_A3 IN ('GBR', 'IRL') AND scalerank = 0" subunit_names.json ./ne_10m_admin_0_label_points/ne_10m_admin_0_label_points.shp
```

```
# jp
# NOTE:
#   - there is one object whose name is null, so filter via `where` clause.
#   - Hoppou Ryodo is not included
#   - manually fixed below:
#     - the region names of Nagasaki, Saga were null.
#     - Okinawa was in Kyushu region.
#     - Hyogo was Hyōgo.
$ ogr2ogr -f GeoJSON -where "adm0_a3 = 'JPN' AND name != ''" states_jp.json ./ne_10m_admin_1_states_provinces/ne_10m_admin_1_states_provinces.shp
```
