# Preval test case

# line_term_prop.md

> Ai > Ai5 > Line term prop
>
> Test normalization of line terminator property access

## Input

`````js filename=intro
const obj = { "\n": 1 };
const x = obj["\n"];
$(x);

// Expected:
// const obj = { "\n": 1 };
// const x = obj["\n"];
// $(x);
`````


## Settled


`````js filename=intro
const obj /*:object*/ = {
  [`
`]: 1,
};
const x /*:unknown*/ =
  obj[
    `
`
  ];
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(
  {
    [`
`]: 1,
  }[
    `
`
  ],
);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { [ "\u000a" ]: 1 };
const b = a[ "\u000a" ];
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const obj = {
  [`
`]: 1,
};
const x =
  obj[
    `
`
  ];
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
