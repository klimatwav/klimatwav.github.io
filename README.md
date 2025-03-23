# https://overpass-turbo.eu/index.html

Get districts from Gdansk (3km away from Wrzeszcz)

```
[out:json];
area[name="Gdańsk"]->.gdansk;

(
  relation["admin_level"="9"](area.gdansk)(around:3000, 54.37809786551607, 18.615853573571982);
);
out geom;
```

# Simplify data

https://mapshaper.org/

Web:
use 'combine-layers' to export our two layers as single json file

Command:
`mapshaper -i export.geojson -simplify dp 8% -o combine-layers simple.geojson`

Edit data

1. set layers names
- poly 
- points 

```
$ target points
$ style r=5
$ style label-text 'this.properties['@relations'][0].reltags.name'
$ style fill='white'
$ style dy=20

$ target poly
$ style stroke='yellow'
$ style fill "black"
$ style stroke-width=2

$ o export.svg format=svg width=1200 target=*
```

Docs
https://github.com/mbloch/mapshaper/wiki/Command-Reference#-style

Command
`mapshaper -i simple.geojson -rename-layers poly,points -target points -style r=5 label-text "this.properties['@relations'][0].reltags.name" fill='white' dy=20 -target poly -style stroke='yellow' fill='black' stroke-width=2 -o export.svg format=svg width=1200 target='*'`


