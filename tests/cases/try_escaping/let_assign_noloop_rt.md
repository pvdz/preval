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
const arr___6__ = [1, 2, 3];
let x___12__ = undefined___13__;
let y___15__ = 1;
try /*18*/ {
  let tmpCalleeParam___22__ = arr___24__[0];
  $(tmpCalleeParam___29__);
  x___33__ = arr___32__;
  const tmpMCF___35__ = arr___37__.reverse___38__;
  $dotCall___41__(tmpMCF___42__, arr___43__, `reverse`);
  y___51__ = [5, 6];
} catch (e___53__) /*54*/ {
  $(`fail`);
}
$(x___63__, y___64__);
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
