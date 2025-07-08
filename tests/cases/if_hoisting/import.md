# Preval test case

# import.md

> If hoisting > Import
>
> Dont hoist imports

## Options

imports dont play well
- skipEval

## Input

`````js filename=intro
if ($(true)) {
  $(2);
} else {
  throw `Preval: cannot call a locked function (binding overwritten with non-func)`;
}
import * as X from 'abc.js'; // This cannot be hoisted up
`````

`````js filename=abc.js
$('hello');
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  $(2);
} else {
  throw `Preval: cannot call a locked function (binding overwritten with non-func)`;
}
import * as X from 'abc.js';
`````

`````js filename=abc.js
$(`hello`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(2);
} else {
  throw `Preval: cannot call a locked function (binding overwritten with non-func)`;
}
import * as X from 'abc.js';
`````

`````js filename=abc.js
$(`hello`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( 2 );
}
else {
  throw "Preval: cannot call a locked function (binding overwritten with non-func)";
}
import { undefined as X } from "abc.js";
`````

`````js filename=abc.js
$( "hello" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  $(2);
} else {
  throw `Preval: cannot call a locked function (binding overwritten with non-func)`;
}
import * as X from 'abc.js';
`````

`````js filename=abc.js
$(`hello`);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

X


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
