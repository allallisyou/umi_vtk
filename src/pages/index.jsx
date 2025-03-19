import yayJpg from '../assets/yay.jpg';
import vtk from '../../Sources/index.js';
import {useEffect, useRef} from "react";


// @ts-ignore
const vtkRenderWindow = vtk.Rendering.Core.vtkRenderWindow;
// @ts-ignore
const vtkRenderer = vtk.Rendering.Core.vtkRenderer;
// @ts-ignore
const vtkOpenGLRenderWindow = vtk.Rendering.OpenGL.vtkRenderWindow;
// @ts-ignore
const vtkRenderWindowInteractor = vtk.Rendering.Core.vtkRenderWindowInteractor;
// @ts-ignore
const vtkSphereSource = vtk.Filters.Sources.vtkSphereSource;
const vtkCubeSource = vtk.Filters.Sources.vtkCubeSource;
// @ts-ignore
const vtkMapper = vtk.Rendering.Core.vtkMapper;
// @ts-ignore
const vtkActor = vtk.Rendering.Core.vtkActor;
const vtkInteractorStyleTrackballCamera = vtk.Interaction.Style.vtkInteractorStyleTrackballCamera;

export default function HomePage() {
    const containerRef = useRef(null);
   useEffect(() => {
        if (!containerRef.current) return;

        // 创建 VTK 渲染窗口
        const renderWindow = vtkRenderWindow.newInstance();
        const renderer = vtkRenderer.newInstance();
        renderWindow.addRenderer(renderer);

        // 创建 OpenGL 渲染窗口
        const openGLRenderWindow = vtkOpenGLRenderWindow.newInstance();
        openGLRenderWindow.setContainer(containerRef.current);
        openGLRenderWindow.setSize(800, 600);
        renderWindow.addView(openGLRenderWindow);




        // 创建第一个立方体
        const cube1 = vtkCubeSource.newInstance({ xLength: 1, yLength: 1, zLength: 1 });
        const mapper1 = vtkMapper.newInstance();
        mapper1.setInputConnection(cube1.getOutputPort());
        const actor1 = vtkActor.newInstance();
        actor1.setMapper(mapper1);
        actor1.setPosition(-1.5, 0, 0); // 左移

        // 创建第二个立方体
        const cube2 = vtkCubeSource.newInstance({ xLength: 1, yLength: 1, zLength: 1 });
        const mapper2 = vtkMapper.newInstance();
        mapper2.setInputConnection(cube2.getOutputPort());
        const actor2 = vtkActor.newInstance();
        actor2.setMapper(mapper2);
        actor2.setPosition(1.5, 0, 0); // 右移

        // 将立方体添加到渲染器
        renderer.addActor(actor1);
        renderer.addActor(actor2);

        // ≥setPosition设置摄像机
        renderer.resetCamera();
        // ✨ 关键：设置交互样式（鼠标旋转）

        // 交互控制器
        const interactor = vtkRenderWindowInteractor.newInstance();
        interactor.setView(openGLRenderWindow);
        interactor.initialize();
        interactor.setContainer(containerRef.current);
        interactor.start();
   const trackballStyle = vtkInteractorStyleTrackballCamera.newInstance();
     interactor.setInteractorStyle(trackballStyle);
        // 触发渲染
        renderWindow.render();

        return () => {
            renderWindow.delete();
        };
    }, []);

    return (<div ref={containerRef} style={{ width: "800px", height: "1200px" }} > </div>);
}
