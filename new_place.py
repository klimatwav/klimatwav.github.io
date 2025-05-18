import json

def create_point_feature_text(coordinates, name):
    """Zwraca string JSON reprezentujący nowy punkt Feature."""
    feature_id = name.lower().replace(" ", "")
    feature_dict = {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": coordinates
        },
        "properties": {
            "@id": feature_id,
            "@relations": [
                {
                    "role": "label",
                    "rel": 2642972,
                    "reltags": {
                        "admin_level": "9",
                        "boundary": "caffee",
                        "name": name,
                        "name:de": name,
                        "name:pl": name,
                        "source": "BIP Gdańsk",
                        "source:image": "http://www.bip.gdansk.pl/plik,34855.html",
                        "source:url": "http://www.bip.gdansk.pl/samorzad,647.html",
                        "type": "boundary"
                    }
                }
            ]
        },
        "id": feature_id
    }
    # Serializacja do tekstu bez spacji po przecinkach/kluczach, z zachowaniem czytelności
    return json.dumps(feature_dict, ensure_ascii=False)

def insert_feature_in_json_text(json_text, feature_text):
    """Wstawia feature_text przed ostatnim elementem listy 'features' w json_text."""
    idx = json_text.rfind("]")  # ostatnie zamknięcie listy
    if idx == -1:
        raise ValueError("Nie znaleziono listy 'features' w pliku JSON.")
    
    # Dodaj przecinek tylko jeśli lista nie jest pusta
    before = json_text[:idx].rstrip()
    if not before.endswith("["):
        before += ",\n"
    after = json_text[idx:]

    return before + feature_text + after

def add_feature_preserve_formatting(input_path, output_path, coordinates, name):
    with open(input_path, "r", encoding="utf-8") as f:
        original_json = f.read()

    new_feature_text = create_point_feature_text(coordinates, name)
    modified_json = insert_feature_in_json_text(original_json, new_feature_text)

    with open(output_path, "w", encoding="utf-8") as f:
        f.write(modified_json)


input_file = "geo/simple.geojson"
output_file = "geo/simple.geojson"
coords = [18.15, 54.36]
name = "Nowa Kawiarnia2"

add_feature_preserve_formatting(input_file, output_file, coords, name)
print(f"Dodano '{name}' do pliku '{output_file}', zachowując formatowanie.")