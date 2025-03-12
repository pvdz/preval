# Preval test case

# property.md

> Normalize > Compound > Property
>
> When decomposing compound assignments to properties we must make sure to retain observable runtime semantics. Consider: "what if the property is a getter?"

## Input

`````js filename=intro
let s = '';
let a = 0;
const obj = {
  get x() { 
    s += 'read;';
    return a;
  },
  set x(v) {
    s += 'write[' + v + '];';
    a += v;
    return a;
  }
};

obj.x += 5; // This line should become `obj.x = obj.x + 5`
$(a, s); // 5, 'read;write[5]'
`````

## Settled


`````js filename=intro
let s /*:string*/ = ``;
let a /*:primitive*/ = 0;
const obj /*:object*/ = {
  get x() {
    debugger;
    const tmpStringConcatR /*:unknown*/ = s;
    s = `${tmpStringConcatR}read;`;
    return a;
  },
  set x($$0) {
    const v /*:unknown*/ = $$0;
    debugger;
    const tmpBinBothLhs /*:unknown*/ = s;
    const tmpStringConcatL /*:string*/ = $coerce(v, `plustr`);
    const tmpBinBothRhs /*:string*/ = `write[${tmpStringConcatL}];`;
    s = tmpBinBothLhs + tmpBinBothRhs;
    a = a + v;
    return a;
  },
};
const tmpCompoundAssignLhs /*:unknown*/ = obj.x;
const tmpAssignMemRhs /*:primitive*/ = tmpCompoundAssignLhs + 5;
obj.x = tmpAssignMemRhs;
$(a, s);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let s = ``;
let a = 0;
const obj = {
  get x() {
    const tmpStringConcatR = s;
    s = `${tmpStringConcatR}read;`;
    return a;
  },
  set x(v) {
    const tmpBinBothLhs = s;
    const tmpStringConcatL = $coerce(v, `plustr`);
    s = tmpBinBothLhs + `write[${tmpStringConcatL}];`;
    a = a + v;
    return a;
  },
};
obj.x = obj.x + 5;
$(a, s);
`````

## Pre Normal


`````js filename=intro
let s = ``;
let a = 0;
const obj = {
  get x() {
    debugger;
    s += `read;`;
    return a;
  },
  set x($$0) {
    let v = $$0;
    debugger;
    s += `write[` + v + `];`;
    a += v;
    return a;
  },
};
obj.x += 5;
$(a, s);
`````

## Normalized


`````js filename=intro
let s = ``;
let a = 0;
const obj = {
  get x() {
    debugger;
    const tmpStringConcatR = $coerce(s, `plustr`);
    s = `${tmpStringConcatR}read;`;
    return a;
  },
  set x($$0) {
    let v = $$0;
    debugger;
    const tmpBinBothLhs = s;
    const tmpStringConcatL = $coerce(v, `plustr`);
    const tmpBinLhs = `write[${tmpStringConcatL}`;
    const tmpStringConcatR$1 = $coerce(tmpBinLhs, `plustr`);
    const tmpBinBothRhs = `${tmpStringConcatR$1}];`;
    s = tmpBinBothLhs + tmpBinBothRhs;
    a = a + v;
    return a;
  },
};
const tmpCompoundAssignLhs = obj.x;
const tmpAssignMemLhsObj = obj;
const tmpAssignMemRhs = tmpCompoundAssignLhs + 5;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
$(a, s);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = "";
let b = 0;
const c = {
  get x() {
    debugger;
    const d = a;
    a = `${d}read;`;
    return b;
  },
  set x( $$0 ) {
    const e = $$0;
    debugger;
    const f = a;
    const g = $coerce( e, "plustr" );
    const h = `write[${g}];`;
    a = f + h;
    b = b + e;
    return b;
  },
};
const i = c.x;
const j = i + 5;
c.x = j;
$( b, a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 5, 'read;write[5];'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
