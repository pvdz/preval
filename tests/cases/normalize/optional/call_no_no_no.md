# Preval test case

# call_no_no_no.md

> Normalize > Optional > Call no no no
>
> Mix optional with regular member call

## Input

`````js filename=intro
function a() {
  const a = {
    a(){ return a; },
    b(){ return a; },
    c(){ return a; },
    d(){ return a; }
  };

  return a;
}
$(a().b().c().d);
`````


## Settled


`````js filename=intro
const a$1 /*:object*/ = {
  a() {
    debugger;
    return a$1;
  },
  b() {
    debugger;
    return a$1;
  },
  c() {
    debugger;
    return a$1;
  },
  d() {
    debugger;
    return a$1;
  },
};
const tmpMCF /*:unknown*/ = a$1.b;
const tmpMCOO /*:unknown*/ = $dotCall(tmpMCF, a$1, `b`);
const tmpMCF$1 /*:unknown*/ = tmpMCOO.c;
const tmpCompObj /*:unknown*/ = $dotCall(tmpMCF$1, tmpMCOO, `c`);
const tmpCalleeParam /*:unknown*/ = tmpCompObj.d;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a$1 = {
  a() {
    return a$1;
  },
  b() {
    return a$1;
  },
  c() {
    return a$1;
  },
  d() {
    return a$1;
  },
};
const tmpMCOO = a$1.b();
$(tmpMCOO.c().d);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a(  ) {
    debugger;
    return a;
  },
  b(  ) {
    debugger;
    return a;
  },
  c(  ) {
    debugger;
    return a;
  },
  d(  ) {
    debugger;
    return a;
  },
};
const b = a.b;
const c = $dotCall( b, a, "b" );
const d = c.c;
const e = $dotCall( d, c, "c" );
const f = e.d;
$( f );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
