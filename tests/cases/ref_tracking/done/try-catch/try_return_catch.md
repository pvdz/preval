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
let /*___4__*/ f = function () /*6*/ {
    debugger;
    let /*___10__*/ x = 1;
    try /*13~23*/ {
      $();
      /*___20__*/ x = 2;
      return /*___23__*/ undefined;
    } catch (/*___25__*/ e) /*26~34*/ {
      $(/*___30__*/ x);
      /*___34__*/ x = 3;
    }
    $(/*___38__*/ x);
    return /*___40__*/ undefined;
  };
$(/*___44__*/ f);
`````


## Todos triggered


None


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

e:
  - w @25      | ########## | not read    | none           | none
