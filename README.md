# Naruto BR API - Em Desenvolvimento

A **Naruto BR API** fornece informações detalhadas sobre personagens e vilas do universo de Naruto em **PT-BR**.
Acesse os dados de forma simples e rápida utilizando os endpoints disponíveis.

---

## 🥷 Endpoints de Personagens

### `/characters`
**Descrição:** Obtém uma lista de todos os personagens disponíveis na API.

**Exemplo de Uso:**
```javascript
fetch('https://naruto-br-api.site/characters')
  .then(response => response.json())
  .then(data => console.log(data));
```

Resposta:

```json
[
  {
    "id": 1,
    "name": "Uzumaki Naruto",
    "father": "Namikaze Minato",
    "mother": "Uzumaki Kushina",
    "village": "Konohagakure",
    "rank": "Hokage",
    "power": 9999,
    "profile_image": "https://example.com/naruto.jpg",
    "summary": "Naruto Uzumaki é o Sétimo Hokage de Konoha, conhecido por sua força e determinação...",
    "jutsus": ["Rasengan", "Kage Bunshin"],
    "images": [
      "https://example.com/naruto-image.jpg",
      "https://example.com/naruto-image.png"
    ]
  },
  {
    // Outros personagens
  }
]
```

### `/characters/:id`

**Descrição:** Obtém os detalhes de um personagem específico utilizando seu ID.

Exemplo de Uso:

```javascript
fetch('https://naruto-br-api.site/characters/1')
  .then(response => response.json())
  .then(data => console.log(data));

```
Resposta:

```json
{
  "id": 1,
  "name": "Uzumaki Naruto",
  "father": "Namikaze Minato",
  "mother": "Uzumaki Kushina",
  "village": "Konohagakure",
  "rank": "Hokage",
  "power": 9999,
  "profile_image": "https://example.com/naruto.jpg",
  "summary": "Naruto Uzumaki é o Sétimo Hokage de Konoha, conhecido por sua força e determinação...",
  "jutsus": ["Rasengan", "Kage Bunshin"],
  "images": [
    "https://example.com/naruto-image.jpg",
    "https://example.com/naruto-image.png"
  ]
}
```

## 🏯 Endpoints de Vilas

### `/villages`

**Descrição:** Obtém uma lista de todas as vilas disponíveis na API.

Exemplo de Uso:

```javascript
fetch('https://naruto-br-api.site/villages')
  .then(response => response.json())
  .then(data => console.log(data));
```

Resposta:

```json
[
  {
    "id": 1,
    "name": "Konohagakure",
    "symbol": "https://example.com/konoha-symbol.png",
    "characters": [
      {
        "id": 1,
        "name": "Uzumaki Naruto"
      },
      {
        "id": 2,
        "name": "Uchiha Sasuke"
      }
    ]
  },
  {
    "id": 2,
    "name": "Sunagakure",
    "symbol": "https://example.com/suna-symbol.png",
    "characters": [
      // Outros personagens
    ]
  }
]
```

### `/villages/:id`

**Descrição:** Obtém os detalhes de uma vila específica utilizando seu ID.

Exemplo de Uso:

```javascript
fetch('https://naruto-br-api.site/villages/1')
  .then(response => response.json())
  .then(data => console.log(data));

```
Resposta:

```json
{
  "id": 1,
  "name": "Konohagakure",
  "symbol": "https://example.com/konoha-symbol.png",
  "characters": [
    {
      "id": 1,
      "name": "Uzumaki Naruto"
    },
    {
      "id": 2,
      "name": "Uchiha Sasuke"
    }
  ]
}
```

## 💡 Observações

**Base URL:** Todas as requisições devem começar com https://naruto-br-api.site.

**Formato da Resposta:** As respostas são fornecidas em JSON.

**CORS:** A API é configurada para permitir acessos de qualquer origem.

## 📄 Licença
Esta API é de uso livre para fins educacionais e pessoais. Créditos ao universo de Naruto, criado por Masashi Kishimoto.
