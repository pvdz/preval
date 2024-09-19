# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Statement > Logic and both > Auto ident opt c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
(1, 2, $(b))?.x && (1, 2, $(b))?.x;
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
(1, 2, $(b))?.x && (1, 2, $(b))?.x;
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
  const tmpChainRootProp$1 = $(b);
  const tmpIfTest$3 = tmpChainRootProp$1 != null;
  if (tmpIfTest$3) {
    const tmpChainElementObject$1 = tmpChainRootProp$1.x;
  } else {
  }
} else {
}
$(a);
`````

## Output


`````js filename=intro
let tmpIfTest = false;
const b /*:object*/ = { x: 1 };
const tmpChainRootProp = $(b);
const tmpIfTest$1 /*:boolean*/ = tmpChainRootProp == null;
if (tmpIfTest$1) {
} else {
  const tmpChainElementObject = tmpChainRootProp.x;
  tmpIfTest = tmpChainElementObject;
}
if (tmpIfTest) {
  const tmpChainRootProp$1 = $(b);
  const tmpIfTest$3 /*:boolean*/ = tmpChainRootProp$1 == null;
  if (tmpIfTest$3) {
  } else {
    tmpChainRootProp$1.x;
  }
} else {
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = false;
const b = { x: 1 };
const c = $( b );
const d = c == null;
if (d) {

}
else {
  const e = c.x;
  a = e;
}
if (a) {
  const f = $( b );
  const g = f == null;
  if (g) {

  }
  else {
    f.x;
  }
}
const h = {
  a: 999,
  b: 1000,
};
$( h );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
