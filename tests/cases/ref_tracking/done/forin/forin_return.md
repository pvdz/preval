# Preval test case

# forin_return.md

> Ref tracking > Done > Forin > Forin return
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

## Options

- refTest

## Input

`````js filename=intro
function f() {
  const obj = {a:10, b:20};
  for (const x in obj) {
    return $(1, 'return');
    $('fail');
  }
  $('keep, do not eval');
}
$(f());
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___5__*/ f = function () /*7*/ {
    debugger;
    const /*___12__*/ obj = { /*___15__*/ a: 10, /*___18__*/ b: 20 };
    const /*___21__*/ tmpForInGen = /*___23__*/ $forIn(/*___24__*/ obj);
    while (/*___26__*/ $LOOP_NO_UNROLLS_LEFT) {
      /*27~60*/ const /*___31__*/ tmpForInNext = /*___33__*/ tmpForInGen();
      const /*___35__*/ tmpIfTest = /*___37__*/ tmpForInNext./*___38__*/ done;
      if (/*___40__*/ tmpIfTest) {
        /*41~42*/ break;
      } /*43~60*/ else {
        const /*___47__*/ x = /*___49__*/ tmpForInNext./*___50__*/ value;
        const /*___52__*/ tmpReturnArg = $(1, `return`);
        return /*___60__*/ tmpReturnArg;
      }
    }
    $(`keep, do not eval`);
    return /*___67__*/ undefined;
  };
let /*___69__*/ tmpCalleeParam = /*___71__*/ f();
$(/*___75__*/ tmpCalleeParam);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
f:
  - w @5       | ########## | 71          | none           | none
  - r @71      | 5

obj:
  - w @12      | ########## | 24          | none           | none
  - r @24      | 12

tmpForInGen:
  - w @21       | ########## | 33          | none           | none
  - r @33       | 21

tmpForInNext:
  - w @31        | ########## | 37,49       | none           | none
  - r @37        | 31
  - r @49        | 31

tmpIfTest:
  - w @35        | ########## | 40          | none           | none
  - r @40        | 35

x:
  - w @47        | ########## | not read    | none           | none

tmpReturnArg:
  - w @52        | ########## | 60          | none           | none
  - r @60        | 52

tmpCalleeParam:
  - w @69          | ########## | 75          | none           | none
  - r @75          | 69
