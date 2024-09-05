# Preval test case

# ctxt_cmp_opt_bc_undef_c.md

> Normalize > Optional > Ctxt cmp opt bc undef c
>
> Ensure context is passed on properly in various optional chaining cases

## Input

`````js filename=intro
const a = {b: {}};
$($(a)[$('b')]?.[$('c')]?.(100));
`````

## Pre Normal


`````js filename=intro
const a = { b: {} };
$($(a)[$(`b`)]?.[$(`c`)]?.(100));
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = {};
const a = { b: tmpObjLitVal };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(a);
const tmpChainRootComputed = $(`b`);
const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
const tmpIfTest = tmpChainElementObject != null;
if (tmpIfTest) {
  const tmpChainRootComputed$1 = $(`c`);
  const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
  const tmpIfTest$1 = tmpChainElementObject$1 != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$1, tmpChainElementObject, 100);
    tmpCalleeParam = tmpChainElementCall$1;
  } else {
  }
} else {
}
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
let tmpCalleeParam = undefined;
const tmpObjLitVal = {};
const a = { b: tmpObjLitVal };
const tmpChainElementCall = $(a);
const tmpChainRootComputed = $(`b`);
const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
const tmpIfTest = tmpChainElementObject == null;
if (tmpIfTest) {
} else {
  const tmpChainRootComputed$1 = $(`c`);
  const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
  const tmpIfTest$1 = tmpChainElementObject$1 == null;
  if (tmpIfTest$1) {
  } else {
    const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$1, tmpChainElementObject, 100);
    tmpCalleeParam = tmpChainElementCall$1;
  }
}
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = {};
const c = { b: b };
const d = $( c );
const e = $( "b" );
const f = d[ e ];
const g = f == null;
if (g) {

}
else {
  const h = $( "c" );
  const i = f[ h ];
  const j = i == null;
  if (j) {

  }
  else {
    const k = $dotCall( i, f, 100 );
    a = k;
  }
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { b: '{}' }
 - 2: 'b'
 - 3: 'c'
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
