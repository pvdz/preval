# Preval test case

# logical.md

> Normalize > Branching > Logical
>
> The logical operators should normalize to concrete branching logic

#TODO

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

## Pre Normal


`````js filename=intro
if (a && b) c;
else d;
`````

## Normalized


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

## Output


`````js filename=intro
let tmpIfTest = a;
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

## PST Output

With rename=true

`````js filename=intro
let a = a;
if (a) {
  a = b;
}
if (a) {
  c;
}
else {
  d;
}
`````

## Globals

BAD@! Found 4 implicit global bindings:

a, b, c, d

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
