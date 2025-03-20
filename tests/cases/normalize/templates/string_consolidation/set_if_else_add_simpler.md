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
  const tmpStringConcatL /*:string*/ = $coerce(t, `plustr`);
  const tmpClusterSSA_z /*:string*/ = `abcdef${tmpStringConcatL}`;
  $(tmpClusterSSA_z);
} else {
  const tmpStringConcatL$1 /*:string*/ = $coerce(s, `plustr`);
  const tmpClusterSSA_z$1 /*:string*/ = `abcghi${tmpStringConcatL$1}`;
  $(tmpClusterSSA_z$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const s = $(`s`);
const t = $(`t`);
if (t) {
  const tmpStringConcatL = $coerce(t, `plustr`);
  $(`abcdef${tmpStringConcatL}`);
} else {
  const tmpStringConcatL$1 = $coerce(s, `plustr`);
  $(`abcghi${tmpStringConcatL$1}`);
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
