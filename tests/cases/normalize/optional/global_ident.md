# Preval test case

# global_ident.md

> Normalize > Optional > Global ident
>
> Ident property access should not be changed

## Input

`````js filename=intro
$(global?.foo);
`````

## Pre Normal


`````js filename=intro
$(global?.foo);
`````

## Normalized


`````js filename=intro
let tmpCalleeParam = undefined;
const tmpChainRootProp = global;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.foo;
  tmpCalleeParam = tmpChainElementObject;
} else {
}
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpIfTest /*:boolean*/ = global == null;
if (tmpIfTest) {
  $(undefined);
} else {
  const tmpChainElementObject /*:unknown*/ = global.foo;
  $(tmpChainElementObject);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = global == null;
if (a) {
  $( undefined );
}
else {
  const b = global.foo;
  $( b );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
