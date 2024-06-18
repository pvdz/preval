# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Statement > Logic or both > Auto ident opt c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
(1, 2, $(b))?.x || (1, 2, $(b))?.x;
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
(1, 2, $(b))?.x || (1, 2, $(b))?.x;
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
} else {
  const tmpChainRootProp$1 = $(b);
  const tmpIfTest$3 = tmpChainRootProp$1 != null;
  if (tmpIfTest$3) {
    const tmpChainElementObject$1 = tmpChainRootProp$1.x;
  } else {
  }
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
} else {
  const tmpChainRootProp$1 = $(b);
  const tmpIfTest$3 = tmpChainRootProp$1 == null;
  if (tmpIfTest$3) {
  } else {
    tmpChainRootProp$1.x;
  }
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

}
else {
  const g = $( a );
  const h = g == null;
  if (h) {

  }
  else {
    g.x;
  }
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
