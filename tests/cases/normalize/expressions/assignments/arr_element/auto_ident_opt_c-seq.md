# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Assignments > Arr element > Auto ident opt c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$((a = (1, 2, $(b))?.x) + (a = (1, 2, $(b))?.x));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$((a = (1, 2, $(b))?.x) + (a = (1, 2, $(b))?.x));
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = undefined;
const tmpChainRootProp = $(b);
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.x;
  a = tmpChainElementObject;
} else {
}
let tmpBinBothLhs = a;
a = undefined;
const tmpChainRootProp$1 = $(b);
const tmpIfTest$1 = tmpChainRootProp$1 != null;
if (tmpIfTest$1) {
  const tmpChainElementObject$1 = tmpChainRootProp$1.x;
  a = tmpChainElementObject$1;
} else {
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = undefined;
const b = { x: 1 };
const tmpChainRootProp = $(b);
const tmpIfTest = tmpChainRootProp == null;
let tmpBinBothLhs = undefined;
if (tmpIfTest) {
} else {
  const tmpChainElementObject = tmpChainRootProp.x;
  a = tmpChainElementObject;
  tmpBinBothLhs = tmpChainElementObject;
}
const tmpChainRootProp$1 = $(b);
const tmpIfTest$1 = tmpChainRootProp$1 == null;
let tmpCalleeParam = undefined;
if (tmpIfTest$1) {
  tmpCalleeParam = tmpBinBothLhs + a;
  $(tmpCalleeParam);
} else {
  const tmpChainElementObject$1 = tmpChainRootProp$1.x;
  a = tmpChainElementObject$1;
  tmpCalleeParam = tmpBinBothLhs + tmpChainElementObject$1;
  $(tmpCalleeParam);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = { x: 1 };
const c = $( b );
const d = c == null;
let e = undefined;
if (d) {

}
else {
  const f = c.x;
  a = f;
  e = f;
}
const g = $( b );
const h = g == null;
let i = undefined;
if (h) {
  i = e + a;
  $( i );
}
else {
  const j = g.x;
  a = j;
  i = e + j;
  $( i );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 2
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
