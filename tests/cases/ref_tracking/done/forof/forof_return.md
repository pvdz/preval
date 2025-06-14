# Preval test case

# forof_return.md

> Ref tracking > Done > Forof > Forof return
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

## Options

- refTest

## Input

`````js filename=intro
function f() {
  for (let x of [10, 20]) {
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
    let /*___12__*/ tmpCalleeParam = [10, 20];
    const /*___17__*/ tmpForOfGenNext = /*___19__*/ $forOf(/*___20__*/ tmpCalleeParam);
    while (/*___22__*/ $LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
      /*23~56*/ const /*___27__*/ tmpForOfNext = /*___29__*/ tmpForOfGenNext();
      const /*___31__*/ tmpIfTest = /*___33__*/ tmpForOfNext./*___34__*/ done;
      if (/*___36__*/ tmpIfTest) {
        /*37~38*/ break;
      } /*39~56*/ else {
        let /*___43__*/ x = /*___45__*/ tmpForOfNext./*___46__*/ value;
        const /*___48__*/ tmpReturnArg = $(1, `return`);
        return /*___56__*/ tmpReturnArg;
      }
    }
    $(`keep, do not eval`);
    return /*___63__*/ undefined;
  };
let /*___65__*/ tmpCalleeParam$1 = /*___67__*/ f();
$(/*___71__*/ tmpCalleeParam$1);
`````


## Todos triggered


None


## Ref tracking result


                     | reads      | read by     | overWrites     | overwritten by
f:
  - w @5       | ########## | 67          | none           | none
  - r @67      | 5

tmpCalleeParam:
  - w @12          | ########## | 20          | none           | none
  - r @20          | 12

tmpForOfGenNext:
  - w @17           | ########## | 29          | none           | none
  - r @29           | 17

tmpForOfNext:
  - w @27           | ########## | 33,45       | none           | none
  - r @33           | 27
  - r @45           | 27

tmpIfTest:
  - w @31           | ########## | 36          | none           | none
  - r @36           | 31

x:
  - w @43           | ########## | not read    | none           | none

tmpReturnArg:
  - w @48           | ########## | 56          | none           | none
  - r @56           | 48

tmpCalleeParam$1:
  - w @65            | ########## | 71          | none           | none
  - r @71            | 65
