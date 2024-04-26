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
    x = 2; // overwrite 1
    return;
  } catch {
    $(x);
    x = 3; // overwrite 1, 2
  }
  
  // x=3. 
  // But preval must consider x=2 possible too.
  // x=1 is not possible because either the try 
  // overwites it or the catch does.
  
  $(x); // reads x = 2,3
}
$(f);
`````

## Output

(Annotated with pids)

`````filename=intro
let f___4__ = function () {
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

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
f:
  - w @4       | ########## | 44          | none           | none
  - r @44      | 4

x:
  - w @10      | ########## | 38          | none           | none
  - w @20      | ########## | not read    | none           | none
  - r @30      | none (TDZ?)
  - w @34      | ########## | not read    | none           | none
  - r @38      | 10
