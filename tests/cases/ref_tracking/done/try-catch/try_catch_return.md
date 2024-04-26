# Preval test case

# try_catch_return.md

> Ref tracking > Done > Try-catch > Try catch return

## Options

- refTest

## Input

`````js filename=intro
function f() {
  
let x = 1;
  try {
    $();
    x = 2; // overwrite 1, read by all
  } catch {
    $(x); // reads 1,2
    x = 3; // overwrite 1, 2
    return;
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
  } catch (e___22__) /*23*/ {
    $(x___27__);
    x___31__ = 3;
    return undefined___34__;
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
  - r @27      | none (TDZ?)
  - w @31      | ########## | not read    | none           | none
  - r @38      | 10
