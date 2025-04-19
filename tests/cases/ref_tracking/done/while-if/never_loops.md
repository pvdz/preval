# Preval test case

# never_loops.md

> Ref tracking > Done > While-if > Never loops
>
> A loop that never loops should not be a loop
> We can fix this when our loops are while(true) and they guarantee to break at the end of every branching path

## Options

- refTest

## Input

`````js filename=intro
if ($) {
  let a = "jhayon.vercel.app"; // never observed, overwritten inside the loop
  let b = "jhayon.vercel.app"; // never observed, overwritten in both branches in the loop
  let c = 1;
  const d = $( "x" );
  while ($LOOP_UNROLL_500) {
    a = d.slice(0);
    const e = a[ 0 ];
    const f = e === ".";
    if (f) {
      b = a.slice( 1 );
    }
    else {
      b = a;
    }
    const h = b.length;
    $(h)
    c = c + 1;
    break;
  }
}
`````


## Output

(Annotated with pids)

`````filename=intro
if ($) {
  /*4*/ let a___14__ = `jhayon.vercel.app`;
  let b___18__ = `jhayon.vercel.app`;
  let c___22__ = 1;
  const d___25__ = $(`x`);
  const tmpMCF___31__ = d___33__.slice___34__;
  a___44__ = $dotCall___38__(tmpMCF___39__, d___40__, `slice`, 0);
  const e___46__ = a___48__[0];
  const f___51__ = e___53__ === `.`;
  if (f___57__) {
    /*58*/ const tmpMCF$1___61__ = a___63__.slice___64__;
    b___74__ = $dotCall___68__(tmpMCF$1___69__, a___70__, `slice`, 1);
  } /*75*/ else {
    b___79__ = a___78__;
  }
  const h___81__ = b___83__.length___84__;
  $(h___88__);
  c___94__ = c___92__ + 1;
} /*95*/ else {
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
a:
  - w @14      | ########## | not read    | none           | 44
  - w @44      | ########## | 48,63,70,78 | 14             | none
  - r @48      | 44
  - r @63      | 44
  - r @70      | 44
  - r @78      | 44

b:
  - w @18      | ########## | not read    | none           | 74,79
  - w @74      | ########## | 83          | 18             | none
  - w @79      | ########## | 83          | 18             | none
  - r @83      | 74,79

c:
  - w @22      | ########## | 92          | none           | 94
  - r @92      | 22
  - w @94      | ########## | not read    | 22             | none

d:
  - w @25      | ########## | 33,40       | none           | none
  - r @33      | 25
  - r @40      | 25

tmpMCF:
  - w @31      | ########## | 39          | none           | none
  - r @39      | 31

e:
  - w @46      | ########## | 53          | none           | none
  - r @53      | 46

f:
  - w @51      | ########## | 57          | none           | none
  - r @57      | 51

tmpMCF$1:
  - w @61      | ########## | 69          | none           | none
  - r @69      | 61

h:
  - w @81      | ########## | 88          | none           | none
  - r @88      | 81
