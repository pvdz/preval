# Preval test case

# ctxt_cmp_opt_ac_pass.md

> Normalize > Optional > Ctxt cmp opt ac pass
>
> Ensure context is passed on properly in various optional chaining cases

## Input

`````js filename=intro
const a = {b: {c: $}};
$($(a)?.[$('b')][$('c')]?.(100));
`````

## Pre Normal


`````js filename=intro
const a = { b: { c: $ } };
$($(a)?.[$(`b`)][$(`c`)]?.(100));
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = { c: $ };
const a = { b: tmpObjLitVal };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(a);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainRootComputed = $(`b`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpChainRootComputed$1 = $(`c`);
  const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
  const tmpIfTest$1 = tmpChainElementObject$1 != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$1, tmpChainElementObject, undefined, 100);
    tmpCalleeParam = tmpChainElementCall$1;
  } else {
  }
} else {
}
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
let tmpCalleeParam /*:unknown*/ = undefined;
const tmpObjLitVal /*:object*/ = { c: $ };
const a /*:object*/ = { b: tmpObjLitVal };
const tmpChainElementCall /*:unknown*/ = $(a);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest) {
} else {
  const tmpChainRootComputed /*:unknown*/ = $(`b`);
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall[tmpChainRootComputed];
  const tmpChainRootComputed$1 /*:unknown*/ = $(`c`);
  const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementObject[tmpChainRootComputed$1];
  const tmpIfTest$1 /*:boolean*/ = tmpChainElementObject$1 == null;
  if (tmpIfTest$1) {
  } else {
    const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementObject$1, tmpChainElementObject, undefined, 100);
    tmpCalleeParam = tmpChainElementCall$1;
  }
}
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = { c: $ };
const c = { b: b };
const d = $( c );
const e = d == null;
if (e) {

}
else {
  const f = $( "b" );
  const g = d[ f ];
  const h = $( "c" );
  const i = g[ h ];
  const j = i == null;
  if (j) {

  }
  else {
    const k = $dotCall( i, g, undefined, 100 );
    a = k;
  }
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { b: '{"c":"\\"<$>\\""}' }
 - 2: 'b'
 - 3: 'c'
 - 4: 100
 - 5: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
