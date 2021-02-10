# Preval test case

# logical.md

> normalize > branching > logical
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

## Normalized

`````js filename=intro
let tmpIfTest = a;
if (tmpIfTest) {
  tmpIfTest = b;
}
if (tmpIfTest) {
  c;
} else {
  d;
}
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
