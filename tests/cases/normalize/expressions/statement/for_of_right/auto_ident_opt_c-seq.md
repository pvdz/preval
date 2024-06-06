# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Statement > For of right > Auto ident opt c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for (let x of (1, 2, $(b))?.x);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
for (let x of (1, 2, $(b))?.x);
$(a);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpForOfDeclRhs = undefined;
const tmpChainRootProp = $(b);
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.x;
  tmpForOfDeclRhs = tmpChainElementObject;
} else {
}
let x = undefined;
for (x of tmpForOfDeclRhs) {
}
$(a);
`````

## Output


`````js filename=intro
const b = { x: 1 };
const a = { a: 999, b: 1000 };
let tmpForOfDeclRhs = undefined;
const tmpChainRootProp = $(b);
const tmpIfTest = tmpChainRootProp == null;
if (tmpIfTest) {
} else {
  const tmpChainElementObject = tmpChainRootProp.x;
  tmpForOfDeclRhs = tmpChainElementObject;
}
let x = undefined;
for (x of tmpForOfDeclRhs) {
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = {
a: 999,
b: 1000
;
let c = undefined;
const d = $( a );
const e = d == null;
if (e) {

}
else {
  const f = d.x;
  c = f;
}
let g = undefined;
for (g of c) {

}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
