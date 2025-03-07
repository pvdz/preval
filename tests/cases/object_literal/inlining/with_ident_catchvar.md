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
  const tmpCalleeParam /*:unknown*/ = e;
  $(tmpCalleeParam);
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

## Pre Normal


`````js filename=intro
try {
  if ($(true)) {
    throw `fail`;
  }
} catch (e) {
  const obj = { f: e };
  $(obj.f);
}
`````

## Normalized


`````js filename=intro
try {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    throw `fail`;
  } else {
  }
} catch (e) {
  const obj = { f: e };
  const tmpCalleeParam = obj.f;
  $(tmpCalleeParam);
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
  const c = b;
  $( c );
}
`````

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
