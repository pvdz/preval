# Preval test case

# auto_ident_func_id.md

> Normalize > Expressions > Assignments > Binary left > Auto ident func id
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = function f() {}) + $(100));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(
  (a = function f() {
    debugger;
  }) + $(100),
);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const f = function () {
  debugger;
  return undefined;
};
a = f;
let tmpBinBothLhs = a;
const tmpBinBothRhs = $(100);
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const f = function () {
  debugger;
  return undefined;
};
const tmpBinBothRhs = $(100);
const tmpCalleeParam = f + tmpBinBothRhs;
$(tmpCalleeParam);
$(f);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
const b = $( 100 );
const c = a + b;
$( c );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 'function() {return undefined;}100'
 - 3: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
