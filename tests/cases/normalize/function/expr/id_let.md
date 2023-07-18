# Preval test case

# id_let.md

> Normalize > Function > Expr > Id let
>
> Function recursion by referencing a function expr id

#TODO

## Input

`````js filename=intro
let f = function findme() {
  $(typeof findme);
  return findme;
};
const x = f();
$(x, typeof f);
`````

## Pre Normal

`````js filename=intro
let f = function findme() {
  debugger;
  $(typeof findme);
  return findme;
};
const x = f();
$(x, typeof f);
`````

## Normalized

`````js filename=intro
const findme = function () {
  debugger;
  const tmpCallCallee = $;
  const tmpCalleeParam = typeof findme;
  tmpCallCallee(tmpCalleeParam);
  return findme;
};
let f = findme;
const x = f();
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = x;
const tmpCalleeParam$3 = typeof f;
tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3);
`````

## Output

`````js filename=intro
const findme = function () {
  debugger;
  $(`function`);
  return findme;
};
$(`function`);
$(findme, `function`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( "function" );
  return a;
},;
$( "function" );
$( a, "function" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'function'
 - 2: '<function>', 'function'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
