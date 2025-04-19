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
let f___5__ = function () /*7*/ {
  debugger;
  let tmpCalleeParam___12__ = [10, 20];
  const tmpForOfGenNext___17__ = $forOf___19__(tmpCalleeParam___20__);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE___22__) {
    /*23*/ const tmpForOfNext___27__ = tmpForOfGenNext___29__();
    const tmpIfTest___31__ = tmpForOfNext___33__.done___34__;
    if (tmpIfTest___36__) {
      /*37*/ break;
    } /*39*/ else {
      let x___43__ = tmpForOfNext___45__.value___46__;
      const tmpReturnArg___48__ = $(1, `return`);
      return tmpReturnArg___56__;
    }
  }
  $(`keep, do not eval`);
  return undefined___63__;
};
let tmpCalleeParam$1___65__ = f___67__();
$(tmpCalleeParam$1___71__);
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
