# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Statement > Ternary a > Auto ident opt c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
(1, 2, $(b))?.x ? $(100) : $(200);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
(1, 2, $(b))?.x ? $(100) : $(200);
$(a);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
const tmpChainRootProp = $(b);
const tmpIfTest$1 = tmpChainRootProp != null;
if (tmpIfTest$1) {
  const tmpChainElementObject = tmpChainRootProp.x;
  tmpIfTest = tmpChainElementObject;
} else {
}
if (tmpIfTest) {
  $(100);
} else {
  $(200);
}
$(a);
`````

## Output


`````js filename=intro
const b = { x: 1 };
const a = { a: 999, b: 1000 };
let tmpIfTest = false;
const tmpChainRootProp = $(b);
const tmpIfTest$1 = tmpChainRootProp == null;
if (tmpIfTest$1) {
} else {
  const tmpChainElementObject = tmpChainRootProp.x;
  tmpIfTest = tmpChainElementObject;
}
if (tmpIfTest) {
  $(100);
} else {
  $(200);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = {
  a: 999,
  b: 1000,
};
let c = false;
const d = $( a );
const e = d == null;
if (e) {

}
else {
  const f = d.x;
  c = f;
}
if (c) {
  $( 100 );
}
else {
  $( 200 );
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 100
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
