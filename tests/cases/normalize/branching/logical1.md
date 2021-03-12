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

## Normalized

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

## Output

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

## Globals

BAD@! Found 4 implicit global bindings:

a, b, c, d

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Normalized calls: Same

Final output calls: Same
