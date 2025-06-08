# Preval test case

# set_if_else_add_simpler.md

> Normalize > Templates > String consolidation > Set if else add simpler
>
> Pattern where the two different strings are concat to an unknown value. Can we merge it with another string that inevitably also gets concat to it?

At least, I think it's simpler.

-->
```
let y = 'abcghi';
if (t) { y = 'abcdef' + t; }
else { }
const z = s + y;
```

## Input

`````js filename=intro
const s = $('s');
const t = $('t');

const x = 'abc'; 
let y = undefined;
if (t) { y = 'def' + t; }
else { y = 'ghi' + s; }
const z = x + y;
$(z);
`````


## Settled


`````js filename=intro
const s /*:unknown*/ = $(`s`);
const t /*:unknown*/ = $(`t`);
if (t) {
  const tmpStringConcatL$2 /*:string*/ = $coerce(t, `plustr`);
  const tmpClusterSSA_z /*:string*/ /*truthy*/ = `abcdef${tmpStringConcatL$2}`;
  $(tmpClusterSSA_z);
} else {
  const tmpStringConcatL$4 /*:string*/ = $coerce(s, `plustr`);
  const tmpClusterSSA_z$1 /*:string*/ /*truthy*/ = `abcghi${tmpStringConcatL$4}`;
  $(tmpClusterSSA_z$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const s = $(`s`);
const t = $(`t`);
if (t) {
  const tmpStringConcatL$2 = $coerce(t, `plustr`);
  $(`abcdef${tmpStringConcatL$2}`);
} else {
  const tmpStringConcatL$4 = $coerce(s, `plustr`);
  $(`abcghi${tmpStringConcatL$4}`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "s" );
const b = $( "t" );
if (b) {
  const c = $coerce( b, "plustr" );
  const d = `abcdef${c}`;
  $( d );
}
else {
  const e = $coerce( a, "plustr" );
  const f = `abcghi${e}`;
  $( f );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const s = $(`s`);
const t = $(`t`);
const x = `abc`;
let y = undefined;
if (t) {
  const tmpStringConcatL = $coerce(t, `plustr`);
  y = `def${tmpStringConcatL}`;
} else {
  const tmpStringConcatL$1 = $coerce(s, `plustr`);
  y = `ghi${tmpStringConcatL$1}`;
}
const z = x + y;
$(z);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 's'
 - 2: 't'
 - 3: 'abcdeft'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
