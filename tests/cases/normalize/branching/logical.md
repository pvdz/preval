# Preval test case

# logical.md

> Normalize > Branching > Logical
>
> The logical operators should normalize to concrete branching logic

## Input

`````js filename=intro
if (a && b) c;
else d;
`````

`````js filename=ideal
if (a) {
  if (b) {
    c;
  } else {
    d;
  }
} else {
  d;
}
`````

`````js filename=probably
const tmp = a && b;
if (tmp) c;
else d;
`````

`````js filename=probably-step2
const tmp = a ? b : a;
if (tmp) c;
else d;
`````

`````js filename=probably-step3
var tmp2;
function f(tmp) {
  if (tmp) c;
  else d;
}
const tmp = a ? (tmp2 = b, f(tmp)) : (tmp2 = a, f(tmp));
`````

`````js filename=probably-step4
var tmp2;
function f(tmp) {
  if (tmp) c;
  else d;
}
a ? (tmp2 = b, f(tmp)) : (tmp2 = a, f(tmp));
`````

`````js filename=probably-step5
function f(tmp) {
  if (tmp) c;
  else d;
}
if (a) { 
  tmp2 = b; 
  f(tmp2);
} else {
  tmp2 = a;
  f(tmp2);
}
`````

`````js filename=probably-step6
function f(tmp) {
  if (tmp) c;
  else d;
}
if (a) { 
  f(b);
} else {
  f(a);
}
`````


## Settled


`````js filename=intro
let tmpIfTest /*:unknown*/ /*ternaryConst*/ = a;
if (a) {
  tmpIfTest = b;
} else {
}
if (tmpIfTest) {
  c;
} else {
  d;
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpIfTest = a;
if (a) {
  tmpIfTest = b;
}
if (tmpIfTest) {
  c;
} else {
  d;
}
`````


## PST Settled
With rename=true

`````js filename=intro
let e = a;
if (a) {
  e = b;
}
if (e) {
  c;
}
else {
  d;
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpIfTest = a;
if (tmpIfTest) {
  tmpIfTest = b;
} else {
}
if (tmpIfTest) {
  c;
} else {
  d;
}
`````


## Todos triggered


None


## Globals


BAD@! Found 4 implicit global bindings:

a, b, c, d


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
