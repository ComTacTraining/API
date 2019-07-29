# COMTAC TRAINING API

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)

Get setup running serverless locally.

## Setup

Clone the repository and install the packages

```
git clone https://github.com/ComTacTraining/API
cd API
npm install
```

## Start Local Server

Start a local server for testing purposes

```
npm install -g serverless
sls dynamodb install
sls offline start
export BASE_DOMAIN=http://localhost:3000
```

## Seed Online

```
sls dynamodb seed --seed=domain --online --region=us-west-2 --stage=dev
```

## Add Sample Evolution

```
curl -H "Content-Type: application/json" -X POST http://localhost:3000/evolutions -d '{"category": "Commercial", "construction": "Modern", "street": "123 Main St.", "size": "Medium", "height": "Single Story", "occupancyType": "Restaurant", "witnessedConditions": "Charlie", "entryEgress": "All", "survivabilityProfile": "NM", "placement": "Charlie", "side": "Charlie", "flowpath": "Uni-Directional", "exhaustPath": "Charlie", "smokeColor": "Brown", "smokeConditions": "Laminar", "intro": "https://s3-us-west-2.amazonaws.com/ctt-video/Commercial+Modern+Intros/CM/CTT+CM+4+Intro.mp4", "approach": "https://s3-us-west-2.amazonaws.com/ctt-video/Approaches/Approach+1.mp4", "alpha": "https://s3-us-west-2.amazonaws.com/ctt-video/Commercial+Modern/Commercial+Modern+Brown+Turbulent+/Commercial+Modern+Brown+Turbulent+/CM+4/CM+Alpha+4+No+Tag++.mp4", "bravo": "https://s3-us-west-2.amazonaws.com/ctt-video/Commercial+Modern/Commercial+Modern+Brown+Turbulent+/Commercial+Modern+Brown+Turbulent+/CM+4/CM+Bravo+4+Tag++.mp4", "charlie": "https://s3-us-west-2.amazonaws.com/ctt-video/Commercial+Modern/Commercial+Modern+Brown+Turbulent+/Commercial+Modern+Brown+Turbulent+/CM+4/CM+Charlie+4+Tag+++.mp4", "delta": "https://s3-us-west-2.amazonaws.com/ctt-video/Commercial+Modern/Commercial+Modern+Brown+Turbulent+/Commercial+Modern+Brown+Turbulent+/CM+4/CM+Delta+4+Tag+++.mp4"}'
```

## Retrieve Evolution

```
curl -H "Content-Type: application/json" -X GET http://localhost:3000/evolutions/:id
```
