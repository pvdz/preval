# Preval test case

# set_if_else_add.md

> Normalize > Templates > String consolidation > Set if else add
>
> Pattern where the two different strings are concat to an unknown value. Can we merge it with another string that inevitably also gets concat to it?

The question is whether we can move `x + y` up into the `if`.

We would need to know that `y` is only read in the last concat to be able to safely move it upward.

We can try to detect whether the result of `y` is that of a string concat in all cases, and if so, concat the string to which it is appended later.

-->
```
let y = 'abcghi';
if (t) { y = 'abcdef' + t; }
else { }
const z = s + y;
```

or

```
let y = undefined;
if (t) { y = 'abcdef' + t; }
else { y = 'abcghi'; }
const z = s + y;
```

## Input

`````js filename=intro
const s = $('s');
const t = $('t');

const x = s + 'abc'; 
let y = undefined; 
if (t) { y = 'def' + t; }
else { y = 'ghi'; } 
const z = x + y;
$(z);
`````


## Settled


`````js filename=intro
const s /*:unknown*/ = $(`s`);
const t /*:unknown*/ = $(`t`);
const tmpStringConcatR /*:string*/ = $coerce(s, `plustr`);
if (t) {
  const tmpStringConcatL$1 /*:string*/ = $coerce(t, `plustr`);
  const tmpClusterSSA_z /*:string*/ /*truthy*/ = `${tmpStringConcatR}abcdef${tmpStringConcatL$1}`;
  $(tmpClusterSSA_z);
} else {
  const tmpClusterSSA_z$1 /*:string*/ /*truthy*/ = `${tmpStringConcatR}abcghi`;
  $(tmpClusterSSA_z$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const s = $(`s`);
const t = $(`t`);
const tmpStringConcatR = $coerce(s, `plustr`);
if (t) {
  const tmpStringConcatL$1 = $coerce(t, `plustr`);
  $(`${tmpStringConcatR}abcdef${tmpStringConcatL$1}`);
} else {
  $(`${tmpStringConcatR}abcghi`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "s" );
const b = $( "t" );
const c = $coerce( a, "plustr" );
if (b) {
  const d = $coerce( b, "plustr" );
  const e = `${c}abcdef${d}`;
  $( e );
}
else {
  const f = `${c}abcghi`;
  $( f );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const s = $(`s`);
const t = $(`t`);
const tmpStringConcatR = $coerce(s, `plustr`);
const x = `${tmpStringConcatR}abc`;
let y = undefined;
if (t) {
  const tmpStringConcatL = $coerce(t, `plustr`);
  y = `def${tmpStringConcatL}`;
} else {
  y = `ghi`;
}
const z = x + y;
$(z);
`````


## Todos triggered


- (todo) find test case where template ends up with multiple expressions


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 's'
 - 2: 't'
 - 3: 'sabcdeft'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
