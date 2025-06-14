# Preval test case

# let_assign_noloop_rt.md

> Try escaping > Let assign noloop rt

Trying to uncover a bug in ref tracking.

## Options

- refTest

## Input

`````js filename=intro
const arr = [1, 2, 3];
let x = undefined;
let y = 1;
try {
  $(arr[0]);
  x = arr;
  arr.reverse();
  y = [5, 6]; // <-- this is the line being checked
} catch {
  $('fail');
}
$(x, y);
`````


## Output

(Annotated with pids)

`````filename=intro
const /*___6__*/ arr = [1, 2, 3];
let /*___12__*/ x = /*___13__*/ undefined;
let /*___15__*/ y = 1;
try /*18~51*/ {
  let /*___22__*/ tmpCalleeParam = /*___24__*/ arr[0];
  $(/*___29__*/ tmpCalleeParam);
  /*___33__*/ x = /*___32__*/ arr;
  const /*___35__*/ tmpMCF = /*___37__*/ arr./*___38__*/ reverse;
  /*___41__*/ $dotCall(/*___42__*/ tmpMCF, /*___43__*/ arr, `reverse`);
  /*___51__*/ y = [5, 6];
} catch (/*___53__*/ e) /*54~59*/ {
  $(`fail`);
}
$(/*___63__*/ x, /*___64__*/ y);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
arr:
  - w @6       | ########## | 24,32,37,43 | none           | none
  - r @24      | 6
  - r @32      | 6
  - r @37      | 6
  - r @43      | 6

x:
  - w @12      | ########## | 63          | none           | 33
  - w @33      | ########## | 63          | 12             | none
  - r @63      | 12,33

y:
  - w @15      | ########## | 64          | none           | 51
  - w @51      | ########## | 64          | 15             | none
  - r @64      | 15,51

tmpCalleeParam:
  - w @22          | ########## | 29          | none           | none
  - r @29          | 22

tmpMCF:
  - w @35          | ########## | 42          | none           | none
  - r @42          | 35

e:
  - w @53          | ########## | not read    | none           | none
