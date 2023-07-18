# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Assignments > Tagged > Auto ident opt c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$`before ${(a = (1, 2, $(b))?.x)} after`;
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$([`before `, ` after`], (a = (1, 2, $(b))?.x));
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
a = undefined;
const tmpChainRootProp = $(b);
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.x;
  a = tmpChainElementObject;
} else {
}
let tmpCalleeParam$1 = a;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const tmpCalleeParam = [`before `, ` after`];
let a = undefined;
const tmpChainRootProp = $(b);
const tmpIfTest = tmpChainRootProp == null;
if (tmpIfTest) {
  $(tmpCalleeParam, undefined);
} else {
  const tmpChainElementObject = tmpChainRootProp.x;
  a = tmpChainElementObject;
  $(tmpCalleeParam, tmpChainElementObject);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = [ "before ", " after",, ];
let c = undefined;
const d = $( a );
const e = d == null;
if (e) {
  $( b, undefined );
}
else {
  const f = d.x;
  c = f;
  $( b, f );
}
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: ['before ', ' after'], 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
