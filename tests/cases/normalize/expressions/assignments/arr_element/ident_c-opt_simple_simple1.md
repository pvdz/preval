# Preval test case

# ident_c-opt_simple_simple1.md

> Normalize > Expressions > Assignments > Arr element > Ident c-opt simple simple1
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let b = { x: 1 };
$(a = b?.x);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let b = { x: 1 };
$((a = b?.x));
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let b = { x: 1 };
const tmpCallCallee = $;
a = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.x;
  a = tmpChainElementObject;
} else {
}
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
