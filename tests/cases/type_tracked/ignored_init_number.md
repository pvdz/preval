# Preval test case

# ignored_init_number.md

> Type tracked > Ignored init number
>
> Updating a binding such that the initial value isn't read allows for a trick that
> improves our internal typing information on that binding in some cases.

## Input

`````js filename=intro
let itooamanumberjack /*:primitive*/ = false;
if (imanumberandilovethrees) {
  itooamanumberjack = $(1) % 2;
} else {
  itooamanumberjack = $(2) % 2;
}
if (itooamanumberjack) {
  $('a', itooamanumberjack);
} else {
  $('b', itooamanumberjack);
}
`````

## Settled


`````js filename=intro
let itooamanumberjack /*:number*/ = 0;
if (imanumberandilovethrees) {
  const tmpBinLhs /*:unknown*/ = $(1);
  itooamanumberjack = tmpBinLhs % 2;
} else {
  const tmpBinLhs$1 /*:unknown*/ = $(2);
  itooamanumberjack = tmpBinLhs$1 % 2;
}
if (itooamanumberjack) {
  $(`a`, itooamanumberjack);
} else {
  $(`b`, itooamanumberjack);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let itooamanumberjack = 0;
if (imanumberandilovethrees) {
  itooamanumberjack = $(1) % 2;
} else {
  itooamanumberjack = $(2) % 2;
}
if (itooamanumberjack) {
  $(`a`, itooamanumberjack);
} else {
  $(`b`, itooamanumberjack);
}
`````

## Pre Normal


`````js filename=intro
let itooamanumberjack = false;
if (imanumberandilovethrees) {
  itooamanumberjack = $(1) % 2;
} else {
  itooamanumberjack = $(2) % 2;
}
if (itooamanumberjack) {
  $(`a`, itooamanumberjack);
} else {
  $(`b`, itooamanumberjack);
}
`````

## Normalized


`````js filename=intro
let itooamanumberjack = false;
if (imanumberandilovethrees) {
  const tmpBinLhs = $(1);
  itooamanumberjack = tmpBinLhs % 2;
} else {
  const tmpBinLhs$1 = $(2);
  itooamanumberjack = tmpBinLhs$1 % 2;
}
if (itooamanumberjack) {
  $(`a`, itooamanumberjack);
} else {
  $(`b`, itooamanumberjack);
}
`````

## PST Settled
With rename=true

`````js filename=intro
let a = 0;
if (imanumberandilovethrees) {
  const b = $( 1 );
  a = b % 2;
}
else {
  const c = $( 2 );
  a = c % 2;
}
if (a) {
  $( "a", a );
}
else {
  $( "b", a );
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

imanumberandilovethrees

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
