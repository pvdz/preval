# Preval test case

# logical1.md

> Normalize > Branching > Logical1
>
> The logical operators should normalize to concrete branching logic

#TODO

## Input

`````js filename=intro
let x = a;
if (x) {
  x = b;
}
if (x) {
  c;
} else {
  d;
}
`````

## Pre Normal


`````js filename=intro
let x = a;
if (x) {
  x = b;
}
if (x) {
  c;
} else {
  d;
}
`````

## Normalized


`````js filename=intro
let x = a;
if (x) {
  x = b;
} else {
}
if (x) {
  c;
} else {
  d;
}
`````

## Output


`````js filename=intro
let x = a;
if (a) {
  x = b;
} else {
}
if (x) {
  c;
} else {
  d;
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = a;
if (a) {
  a = b;
}
if (a) {
  c;
}
else {
  d;
}
`````

## Globals

BAD@! Found 4 implicit global bindings:

a, b, c, d

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
