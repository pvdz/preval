# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Bindings > Stmt global top > Auto ident opt c-seq
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = (1, 2, $(b))?.x;
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = (1, 2, $(b))?.x;
$(a);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = undefined;
const tmpChainRootProp = $(b);
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.x;
  a = tmpChainElementObject;
} else {
}
$(a);
`````

## Output


`````js filename=intro
const b = { x: 1 };
const tmpChainRootProp = $(b);
const tmpIfTest = tmpChainRootProp == null;
if (tmpIfTest) {
  $(undefined);
} else {
  const tmpChainElementObject = tmpChainRootProp.x;
  $(tmpChainElementObject);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = b == null;
if (c) {
  $( undefined );
}
else {
  const d = b.x;
  $( d );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
