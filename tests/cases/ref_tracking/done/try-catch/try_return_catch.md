# Preval test case

# try_return_catch.md

> Ref tracking > Done > Try-catch > Try return catch

## Options

- refTest

## Input

`````js filename=intro
function f() {
  let x = 1;
  try {
    $();
    x = 2; // overwrite 1. not observed.
    return;
  } catch {
    $(x);
    x = 3; // overwrite 1, 2
  }
  
  $(x); // 3. if it gets here at all then x=2 is not visited
}
$(f);
`````


## Output

(Annotated with pids)

`````filename=intro
let f___4__ = function () /*6*/ {
  debugger;
  let x___10__ = 1;
  try /*13*/ {
    $();
    x___20__ = 2;
    return undefined___23__;
  } catch (e___25__) /*26*/ {
    $(x___30__);
    x___34__ = 3;
  }
  $(x___38__);
  return undefined___40__;
};
$(f___44__);
`````


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
f:
  - w @4       | ########## | 44          | none           | none
  - r @44      | 4

x:
  - w @10      | ########## | 30          | none           | 20,34
  - w @20      | ########## | 30          | 10             | 34
  - r @30      | 10,20
  - w @34      | ########## | 38          | 10,20          | none
  - r @38      | 34
