# Preval test case

# with_ident_catchvar.md

> Object literal > Inlining > With ident catchvar
>
>

## Input

`````js filename=intro
try {
  if ($(true)) {
    throw 'fail';
  }
} catch (e) {
  const obj = {f: e};
  $(obj.f);
}
`````


## Settled


`````js filename=intro
try {
  const tmpIfTest /*:unknown*/ = $(true);
  if (tmpIfTest) {
    throw `fail`;
  } else {
  }
} catch (e) {
  $(e);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  if ($(true)) {
    throw `fail`;
  }
} catch (e) {
  $(e);
}
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  const a = $( true );
  if (a) {
    throw "fail";
  }
}
catch (b) {
  $( b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
try {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    throw `fail`;
  } else {
  }
} catch (e) {
  const obj = { f: e };
  let tmpCalleeParam = obj.f;
  $(tmpCalleeParam);
}
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 'fail'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
