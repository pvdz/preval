# Preval test case

# cond_let_called.md

> Binding > Cond let called
>
> A let that is conditionally initialized and then used in an init can be collapsed

## Input

`````js filename=intro
let x = ``;
if (a) {
  x = `source`;
} else {
  x = `arguments`;
}
const y = parseExpression(x);
$(y);
`````

## Pre Normal


`````js filename=intro
let x = ``;
if (a) {
  x = `source`;
} else {
  x = `arguments`;
}
const y = parseExpression(x);
$(y);
`````

## Normalized


`````js filename=intro
let x = ``;
if (a) {
  x = `source`;
} else {
  x = `arguments`;
}
const y = parseExpression(x);
$(y);
`````

## Output


`````js filename=intro
if (a) {
  const tmpClusterSSA_y /*:unknown*/ = parseExpression(`source`);
  $(tmpClusterSSA_y);
} else {
  const tmpClusterSSA_y$1 /*:unknown*/ = parseExpression(`arguments`);
  $(tmpClusterSSA_y$1);
}
`````

## PST Output
  
With rename=true

`````js filename=intro
if (a) {
  const b = parseExpression( "source" );
  $( b );
}
else {
  const c = parseExpression( "arguments" );
  $( c );
}
`````

## Globals

BAD@! Found 2 implicit global bindings:

a, parseExpression

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
